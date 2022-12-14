class UsersController < ApplicationController
  skip_before_action :authorize, only: %i[index show create]

  ############################### /users
  def index
    render json: User.all
  end

  ############################### /me
  def show
    user = User.find_by!(id: session[:user_id])
    render json: user
  end

  ############################### /signup
  def create
    if params[:password_confirmation] == params[:password]
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: ["Confirmation password does not match password"] }
    end
  end

  ############################### /users/media
  def media
    user = User.find_by!(id: session[:user_id])
    render json: user.media_users
  end

  private

  def user_params
    params.permit(
      :email,
      :password,
      :password_confirmation,
      :first_name,
      :last_name
    )
  end
end
