class MediaController < ApplicationController
  def index
    render json: Medium.all
  end

  ############################ /media/:id/media_series
  def mediaSeries
    media = Medium.find_by!(id: params[:id])
    render json: media.media_season
  end
end
