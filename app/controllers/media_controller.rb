require "fuzzystringmatch"

class MediaController < ApplicationController
  skip_before_action :authorize, only: [:create]

  ################################################################################################### get /media
  ##### includes search capabilities. search expects a string
  def index
    user = User.find_by(id: session[:user_id])
    if (params[:search])
      options = JSON.parse(params[:options])
      send_media = []

      if options["consumed"] == true
        consumed_media = Medium.consumed_search(params[:search], user)
        send_media = send_media + consumed_media
      end

      if options["imdb"] == true
        imdb_media = Medium.imdb_search(params[:search], user)
        send_media = send_media + imdb_media
      end

      if options["google_books"] == true
        google_books_media = Medium.google_books_search(params[:search], user)
        send_media = send_media + google_books_media
      end

      render json: send_media, each_serializer: nil
    else
      render json: Medium.all
    end
  end

  ################################################################################################### get /media/:id
  def show
    medium = Medium.find_by!(id: params[:id])
    render json: medium
  end

  ################################################################################################### post /media
  def create
    ######### find user
    user = User.find_by!(id: session[:user_id])
    ######### create media
    media_user =
      Medium.create_media_and_related_objects(
        {
          media_type: media_params[:media_type],
          year: media_params[:year],
          month: media_params[:month],
          date: media_params[:date],
          title: media_params[:title],
          description: media_params[:description],
          image: media_params[:image],
          rating: media_params[:rating],
          review: media_params[:review],
          site_consumed: media_params[:site_consumed],
          consumed: media_params[:consumed],
          notes: media_params[:notes],
          creator: media_params[:creator],
          series_exists: media_params[:series_exists],
          series_title: media_params[:series_title],
          season_number: media_params[:season_number],
          season_exists: media_params[:season_exists],
          media_number: media_params[:media_number]
        },
        user
      )

    render json: media_user
  end

  ################################################################################################### patch /media/:id
  def update
    ######### find user
    user = User.find_by!(id: session[:user_id])
    ######### create media
    media_user =
      Medium.update_media_and_related_objects(
        {
          media_type_id: media_params[:media_type_id],
          media_type: media_params[:media_type],
          year: media_params[:year],
          month: media_params[:month],
          date: media_params[:date],
          title: media_params[:title],
          description: media_params[:description],
          image: media_params[:image],
          rating: media_params[:rating],
          review: media_params[:review],
          site_consumed: media_params[:site_consumed],
          consumed: media_params[:consumed],
          notes: media_params[:notes],
          creator: media_params[:creator],
          series_exists: media_params[:series_exists],
          series_title: media_params[:series_title],
          season_number: media_params[:season_number],
          season_exists: media_params[:season_exists],
          media_number: media_params[:media_number],
          series_id: media_params[:series_id],
          season_id: media_params[:season_id],
          medium_id: params[:id],
          media_user_id: media_params[:media_user_id],
          creator_ids: media_params[:creator_ids]
        },
        user
      )

    render json: media_user
  end

  ################################################################################################### get /media/:id/media_series
  def mediaSeries
    media = Medium.find_by!(id: params[:id].to_i)
    media_season = MediaSeason.find_by(medium_id: media.id)
    render json: media_season
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
