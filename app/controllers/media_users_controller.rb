class MediaUsersController < ApplicationController
  def index
    render json: MediaUser.all
  end

  def create
    user = User.find_by(id: session[:user_id])
    medium = Medium.find_by(id: params[:id])
    media_user =
      MediaUser.create(user: user, medium: medium, consumed: "not consumed")

    render json: media_user
  end

  def destroy
    media_user = MediaUser.find_by!(id: params[:id])
    media_user.destroy
  end
end
