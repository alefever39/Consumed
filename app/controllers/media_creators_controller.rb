class MediaCreatorsController < ApplicationController
  def index
    render json: MediaCreator.all
  end
end
