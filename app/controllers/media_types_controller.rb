class MediaTypesController < ApplicationController
  def index
    render json: MediaType.all
  end
end
