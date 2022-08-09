class MediaUsersController < ApplicationController
  def index
    render json: MediaUser.all
  end
end
