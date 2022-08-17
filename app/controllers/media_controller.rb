require "fuzzystringmatch"

class MediaController < ApplicationController
  skip_before_action :authorize, only: [:create]

  ################################################################################################### get /index
  def index
    if (params[:search])
      jarow = FuzzyStringMatch::JaroWinkler.create(:native)
      user = User.find_by(id: session[:user_id])

      all_media = Medium.all

      if params[:search] == ""
        media =
          all_media.select do |medium|
            !MediaUser.find_by(user: user, medium: medium)
          end

        send_media = media.sample(10)

        render json: send_media, each_serializer: UserUnspecificMediumSerializer
      else
        media =
          all_media.select do |medium|
            media_user_exists = MediaUser.find_by(user: user, medium: medium)
            if media_user_exists
              false
            else
              comparison =
                jarow.getDistance(
                  medium.title.downcase,
                  params[:search].downcase
                )
              comparison >= 0.6
            end
          end

        sorted_media =
          media.sort do |a, b|
            jarow.getDistance(b.title.downcase, params[:search].downcase) <=>
              jarow.getDistance(a.title.downcase, params[:search].downcase)
          end

        send_media = sorted_media.first(10)

        render json: send_media, each_serializer: UserUnspecificMediumSerializer
      end
    else
      render json: Medium.all
    end
  end

  ################################################################################################### post /media
  def create
    @records_to_add = []
    ######### find media_type
    media_type = MediaType.find_by!(media_type: media_params[:media_type])

    ######### find user
    user = User.find_by!(id: session[:user_id])

    ######### build release date
    release_date =
      "#{media_params[:year]}-#{media_params[:month].to_s.rjust(2, "0")}-#{media_params[:date].to_s.rjust(2, "0")}"

    ######### create media if it doesn't exist
    media_exists = Medium.find_by(title: media_params[:title])
    if media_exists
      medium = media_exists
    else
      medium =
        Medium.create!(
          {
            title: media_params[:title],
            description: media_params[:description],
            release_date: release_date,
            media_type: media_type,
            image: media_params[:image]
          }
        )

      @records_to_add = [medium] + @records_to_add
    end

    ######### create media_user
    media_user =
      MediaUser.create!(
        rating: media_params[:rating],
        review: media_params[:review],
        site_consumed: media_params[:site_consumed],
        consumed: media_params[:consumed],
        notes: media_params[:notes],
        medium: medium,
        user: user
      )
    @records_to_add = [media_user] + @records_to_add

    ######### split creator string
    creators_strings =
      media_params[:creator].split(",").map { |creator| creator.strip }

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

    ######### if there is a series, create series if it doesn't exist
    if (media_params[:series_exists])
      existing_series = Series.find_by(title: media_params[:series_title])
      if existing_series
        series = existing_series
      else
        series = Series.create!(title: media_params[:series_title])
        @records_to_add = [series] + @records_to_add
      end

      ######### 1f there is a season, create season 1f it doesn't exist. 1f there isn't a season, but there is a series. Create season with number of 1.
      existing_season =
        Season.find_by(number: media_params[:season_number], series: series)
      if existing_season
        season = existing_season
      else
        season =
          Season.create!(
            number: media_params[:season_number],
            series: series,
            season_exists: media_params[:season_exists]
          )
        @records_to_add = [season] + @records_to_add
      end

      ######### create media_season
      existing_media_season =
        MediaSeason.find_by(
          number: media_params[:media_number],
          season: season,
          medium: medium
        )
      if existing_media_season
        media_season = existing_media_season
      else
        media_season =
          MediaSeason.create!(
            number: media_params[:media_number],
            season: season,
            medium: medium
          )
        @records_to_add = [media_season] + @records_to_add
      end
    end

    @records_to_add = []

    render json: media_user
  end

  ################################################################################################### patch /media/:id
  def update
    @records_to_add = []
    ######### find user
    orig_user = User.find_by!(id: session[:user_id])

    ######### find media_type
    orig_media_type = MediaType.find_by!(id: media_params[:media_type_id])

    ######### find medium
    medium = Medium.find_by!(id: params[:id])

    ######### find media_user
    media_user = MediaUser.find_by!(id: media_params[:media_user_id])

    ######### find series
    orig_series = Series.find_by!(id: media_params[:series_id])

    ######### find season
    orig_season = Season.find_by!(id: media_params[:season_id])

    ######### find media_season
    orig_media_season =
      MediaSeason.find_by!(medium: medium, season: orig_season)

    ######### split creator string
    orig_creators_ids_strings =
      media_params[:creator_ids].split(",").map { |creator| creator.strip }

    new_creators_strings =
      media_params[:creator].split(",").map { |creator| creator.strip }

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
      # new_creators_object =
      #   new_creators_objects.find do |new_creators_object|
      #     new_creators_object.name == orig_creator_object.name
      #   end

      # media_creator.destroy if media_creator && !new_creators_object
    end

    ######### create media_creators
    new_creators_objects.map do |creator|
      MediaCreator.create(medium: medium, creator: creator)
    end

    ######### build release date
    release_date =
      "#{media_params[:year]}-#{media_params[:month].to_s.rjust(2, "0")}-#{media_params[:date].to_s.rjust(2, "0")}"

    ######### find new media_type
    new_media_type = MediaType.find_by!(media_type: media_params[:media_type])

    ######### update media
    medium.update!(
      {
        title: media_params[:title],
        description: media_params[:description],
        release_date: release_date,
        media_type: new_media_type,
        image: media_params[:image]
      }
    )

    ######### update media_user
    media_user.update!(
      rating: media_params[:rating],
      review: media_params[:review],
      site_consumed: media_params[:site_consumed],
      consumed: media_params[:consumed],
      notes: media_params[:notes]
    )

    ######### delete media_season if there is no longer a series
    if !media_params[:series_exists] && orig_media_season
      orig_media_season.destroy

      ######### update media_season/series/season if series exists and orig_media exists
    elsif media_params[:series_exists] && orig_media_season
      orig_media_season.update!(number: media_params[:media_number])
      orig_series.update!(title: media_params[:series_title])
      orig_season.update!(
        number: media_params[:season_number],
        season_exists: media_params[:season_exists]
      )

      ######### create media_season/series/season if series exists and orig_media does not exist as necessary
    elsif media_params[:series_exists] && !orig_media_season
      ######### create series 1f it doesn't exist
      existing_series = Series.find_by(title: media_params[:series_title])
      if existing_series
        series = existing_series
      else
        series = Series.create!(title: media_params[:series_title])
        @records_to_add = [series] + @records_to_add
      end

      ######### create season 1f it doesn't exist
      existing_season =
        Season.find_by(number: media_params[:season_number], series: series)
      if existing_season
        season = existing_season
      else
        season =
          Season.create!(
            number: media_params[:season_number],
            series: series,
            season_exists: media_params[:season_exists]
          )
        @records_to_add = [season] + @records_to_add
      end

      ######### create media_season
      existing_media_season =
        MediaSeason.find_by(
          number: media_params[:media_number],
          season: season,
          medium: medium
        )
      if existing_media_season
        media_season = existing_media_season
      else
        media_season =
          MediaSeason.create!(
            number: media_params[:media_number],
            season: season,
            medium: medium
          )
        @records_to_add = [media_season] + @records_to_add
      end
    end

    render json: media_user
  end

  ################################################################################################### get /media/:id/media_series
  def mediaSeries
    media = Medium.find_by!(id: params[:id])
    media_season = MediaSeason.find_by(medium_id: media.id)
    render json: media_season
  end

  ################################################################################################### get /media?search=:query
  def search
    byebug
  end

  private

  def media_params
    params.permit(
      :title,
      :media_type,
      :image,
      :creator,
      :year,
      :month,
      :date,
      :description,
      :rating,
      :review,
      :series_title,
      :season_number,
      :media_number,
      :series_exists,
      :season_exists,
      :site_consumed,
      :consumed,
      :notes,
      :media_user_id,
      :creator_ids,
      :media_type_id,
      :media_series_id,
      :series_id,
      :season_id
    )
  end
end
