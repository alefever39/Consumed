require "fuzzystringmatch"

class Medium < ApplicationRecord
  belongs_to :media_type
  has_many :media_users, dependent: :destroy
  has_many :users, through: :media_users
  has_one :media_season, dependent: :destroy
  has_one :season, through: :media_season
  has_one :series, through: :season
  has_many :media_creators, dependent: :destroy
  has_many :creators, through: :media_creators

  validates :title, presence: true, uniqueness: { scope: :media_type }

  def self.consumed_search(search, user)
    jarow = FuzzyStringMatch::JaroWinkler.create(:native)

    all_media = Medium.all

    if search == ""
      media =
        all_media.select do |medium|
          !MediaUser.find_by(user: user, medium: medium)
        end

      consumed_media =
        media
          .sample(10)
          .map do |medium|
            {
              id: medium.attributes["id"],
              title: medium.attributes["title"],
              image: medium.attributes["image"],
              source: "consumed"
            }
          end

      consumed_media
    else
      media =
        all_media.select do |medium|
          media_user_exists = MediaUser.find_by(user: user, medium: medium)
          if media_user_exists
            false
          else
            comparison =
              jarow.getDistance(medium.title.downcase, search.downcase)
            comparison >= 0.6
          end
        end

      sorted_media =
        media.sort do |a, b|
          jarow.getDistance(b.title.downcase, search.downcase) <=>
            jarow.getDistance(a.title.downcase, search.downcase)
        end

      consumed_media =
        sorted_media
          .first(10)
          .map do |medium|
            {
              id: medium.attributes["id"],
              title: medium.attributes["title"],
              image: medium.attributes["image"],
              source: "consumed"
            }
          end

      consumed_media
    end
  end

  def self.imdb_search(search, user)
    data_as_hash = ExternalApi.imdb(search)
    imdb_media =
      data_as_hash["results"]
        .first(10)
        .map do |medium|
          {
            id: medium["id"],
            title: medium["title"],
            image: medium["image"],
            source: "imdb"
          }
        end
    imdb_media
  end

  def self.google_books_search(search, user)
    data_as_hash = ExternalApi.google_books(search)
    google_books_media =
      data_as_hash["items"]
        .first(10)
        .map do |medium|
          if medium["volumeInfo"]["imageLinks"]
            image = medium["volumeInfo"]["imageLinks"]["thumbnail"]
          else
            image = nil
          end
          {
            id: medium["id"],
            title: medium["volumeInfo"]["title"],
            image: image,
            source: "google_books"
          }
        end
    google_books_media
  end

  def self.create_media_and_related_objects(params_object, user)
    $records_to_add = []
    ######### find media_type
    media_type_search =
      MediaType.find_by(media_type: params_object[:media_type])
    if media_type_search
      media_type = media_type_search
    else
      media_type = MediaType.create(media_type: params_object[:media_type])
    end

    ######### build release date
    release_date =
      "#{params_object[:year]}-#{params_object[:month].to_s.rjust(2, "0")}-#{params_object[:date].to_s.rjust(2, "0")}"

    ######### create media if it doesn't exist
    media_exists = Medium.find_by(title: params_object[:title])
    if media_exists
      medium = media_exists
    else
      medium =
        Medium.create!(
          {
            title: params_object[:title],
            description: params_object[:description],
            release_date: release_date,
            media_type: media_type,
            image: params_object[:image],
            external_id: params_object[:external_id]
          }
        )

      $records_to_add = [medium] + $records_to_add
    end

    ######### create media_user
    media_user =
      MediaUser.create!(
        rating: params_object[:rating],
        review: params_object[:review],
        site_consumed: params_object[:site_consumed],
        consumed: params_object[:consumed],
        notes: params_object[:notes],
        medium: medium,
        user: user
      )
    $records_to_add = [media_user] + $records_to_add

    if params_object[:creator] != nil && params_object[:creator] != ""
      byebug
      ######### split creator string
      creators_strings =
        params_object[:creator].split(",").map { |creator| creator.strip }

      ######### create creators if they don't exist
      creators_objects =
        creators_strings.map do |creator|
          creator_to_add = Creator.find_by(name: creator)
          if creator_to_add
            creator = creator_to_add
          else
            creator = Creator.create!(name: creator)
          end
          creator
        end

      ######### create media_creators
      creators_objects.map do |creator|
        MediaCreator.create!(medium: medium, creator: creator)
      end
    end

    ######### if there is a series, create series if it doesn't exist
    if (params_object[:series_exists])
      existing_series = Series.find_by(title: params_object[:series_title])
      if existing_series
        series = existing_series
      else
        series = Series.create!(title: params_object[:series_title])
        $records_to_add = [series] + $records_to_add
      end

      ######### 1f there is a season, create season 1f it doesn't exist. 1f there isn't a season, but there is a series. Create season with number of 1.
      existing_season =
        Season.find_by(number: params_object[:season_number], series: series)
      if existing_season
        season = existing_season
      else
        season =
          Season.create!(
            number: params_object[:season_number],
            series: series,
            season_exists: params_object[:season_exists]
          )
        $records_to_add = [season] + $records_to_add
      end

      ######### create media_season
      existing_media_season =
        MediaSeason.find_by(
          number: params_object[:media_number],
          season: season,
          medium: medium
        )
      if existing_media_season
        media_season = existing_media_season
      else
        media_season =
          MediaSeason.create!(
            number: params_object[:media_number],
            season: season,
            medium: medium
          )
        $records_to_add = [media_season] + $records_to_add
      end
    end

    $records_to_add = []

    media_user
  end

  def self.update_media_and_related_objects(params_object, user)
    $records_to_add = []

    ######### find media_type
    orig_media_type = MediaType.find_by!(id: params_object[:media_type_id])

    ######### find medium
    medium = Medium.find_by!(id: params_object[:medium_id])

    ######### find media_user
    media_user = MediaUser.find_by!(id: params_object[:media_user_id])

    ######### find series
    orig_series = Series.find_by(id: params_object[:series_id])

    ######### find season
    orig_season = Season.find_by(id: params_object[:season_id])

    ######### find media_season
    orig_media_season = MediaSeason.find_by(medium: medium, season: orig_season)

    ######### split creator string
    orig_creators_ids_strings =
      params_object[:creator_ids].split(",").map { |creator| creator.strip }

    new_creators_strings =
      params_object[:creator].split(",").map { |creator| creator.strip }

    ######### find original creators
    orig_creators_objects =
      orig_creators_ids_strings.map { |creator| Creator.find_by(id: creator) }

    ######### create creators if they don't exist
    new_creators_objects =
      new_creators_strings.map do |creator|
        creator_to_add = Creator.find_by(name: creator)
        if creator_to_add
          creator = creator_to_add
        else
          creator = Creator.create!(name: creator)
        end
        creator
      end

    ######### find and destroy original media_creators
    orig_creators_objects.map do |orig_creator_object|
      MediaCreator.find_by(medium: medium, creator: orig_creator_object).destroy
    end

    ######### create media_creators
    new_creators_objects.map do |creator|
      MediaCreator.create(medium: medium, creator: creator)
    end

    ######### build release date
    release_date =
      "#{params_object[:year]}-#{params_object[:month].to_s.rjust(2, "0")}-#{params_object[:date].to_s.rjust(2, "0")}"

    ######### find new media_type
    new_media_type = MediaType.find_by!(media_type: params_object[:media_type])

    ######### update media
    medium.update!(
      {
        title: params_object[:title],
        description: params_object[:description],
        release_date: release_date,
        media_type: new_media_type,
        image: params_object[:image]
      }
    )

    ######### update media_user
    media_user.update!(
      rating: params_object[:rating],
      review: params_object[:review],
      site_consumed: params_object[:site_consumed],
      consumed: params_object[:consumed],
      notes: params_object[:notes]
    )

    ######### delete media_season if there is no longer a series
    if !params_object[:series_exists] && orig_media_season
      orig_media_season.destroy

      ######### update media_season/series/season if series exists and orig_media exists
    elsif params_object[:series_exists] && orig_media_season
      orig_media_season.update!(number: params_object[:media_number])
      orig_series.update!(title: params_object[:series_title])
      orig_season.update!(
        number: params_object[:season_number],
        season_exists: params_object[:season_exists]
      )

      ######### create media_season/series/season if series exists and orig_media does not exist as necessary
    elsif params_object[:series_exists] && !orig_media_season
      ######### create series 1f it doesn't exist
      existing_series = Series.find_by(title: params_object[:series_title])
      if existing_series
        series = existing_series
      else
        series = Series.create!(title: params_object[:series_title])
        $records_to_add = [series] + $records_to_add
      end

      ######### create season 1f it doesn't exist
      existing_season =
        Season.find_by(number: params_object[:season_number], series: series)
      if existing_season
        season = existing_season
      else
        season =
          Season.create!(
            number: params_object[:season_number],
            series: series,
            season_exists: params_object[:season_exists]
          )
        $records_to_add = [season] + $records_to_add
      end

      ######### create media_season
      existing_media_season =
        MediaSeason.find_by(
          number: params_object[:media_number],
          season: season,
          medium: medium
        )
      if existing_media_season
        media_season = existing_media_season
      else
        media_season =
          MediaSeason.create!(
            number: params_object[:media_number],
            season: season,
            medium: medium
          )
        $records_to_add = [media_season] + $records_to_add
      end
    end
    $records_to_add = []

    media_user
  end
end
