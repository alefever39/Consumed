class CreatorsController < ApplicationController
  def index
    render json: Creator.all
  end
end
