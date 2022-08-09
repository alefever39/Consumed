class SeasonsController < ApplicationController
  def index
    render json: Season.all
  end
end
