class ExternalApiController < ApplicationController
  skip_before_action :authorize, only: [:imdb]

  ############## get /imdb?search=:search
  def imdb
    data_as_hash = ExternalApi.imdb(params[:search])
    render json: data_as_hash
  end

  ############## get /imdb_by_id?title_id=:title_id
  def imdb_by_id
    data_as_hash = ExternalApi.imdb_by_id(params[:title_id])
    byebug
    ExternalApi.budb_post(
      {
        title: data_as_hash["title"],
        title_id: params[:title_id],
        response: data_as_hash,
        api: "imdb"
      }
    )
    render json: data_as_hash
  end

  ############## get /budb_get_all
  def budb_get_all
    data_as_hash = ExternalApi.budb_get_all
    render json: data_as_hash
  end

  ############## post /budb_post
  ############## expected params: title, title_id, response, api
  def budb_post
    data_as_hash =
      ExternalApi.budb_post(
        {
          title: params[:title],
          title_id: params[:title_id],
          response: params[:response],
          api: params[:api]
        }
      )
    render json: data_as_hash
  end
end
