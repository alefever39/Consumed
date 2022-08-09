class MediaController < ApplicationController
  def index
    render json: Medium.all
  end
end
