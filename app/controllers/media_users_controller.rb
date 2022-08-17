class MediaUsersController < ApplicationController
  def index
    render json: MediaUser.all
  end

  def destroy
    media_user = MediaUser.find_by!(id: params[:id])
    media_user.destroy
  end
end
