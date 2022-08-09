class MediaSeasonsController < ApplicationController
  def index
    render json: MediaSeason.all
  end
end
