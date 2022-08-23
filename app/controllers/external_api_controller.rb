require "concurrent"

class ExternalApiController < ApplicationController
  include Concurrent::Async
  skip_before_action :authorize, only: [:imdb]

  ############## get /imdb?search=:search
  def imdb
    data_as_hash = ExternalApi.imdb(params[:search])
    render json: data_as_hash
  end

  ############## get /imdb_by_id?title_id=:title_id
  def imdb_by_id
    user = User.find_by(id: session[:user_id])
    medium = Medium.find_by(external_id: params[:title_id])

    if medium
      render json: medium
    else
      data_as_hash = ExternalApi.imdb_by_id(params[:title_id])
      ExternalApi.budb_post(
        {
          title: data_as_hash["title"],
          title_id: params[:title_id],
          response: data_as_hash,
          api: "imdb"
        }
      )
      Medium.create_media_and_related_objects(
        ExternalApi.convert_imdb_response_to_params_hash(
          data_as_hash,
          params[:title_id]
        ),
        user
      )
      medium = Medium.find_by(external_id: params[:title_id])
      render json: medium
    end
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

  def get_database_responses
    backup_database_response = ExternalApi.budb_get_all
    responses =
      backup_database_response.map { |response| eval(response["response"]) }
    render json: backup_database_response
  end

  ############## get /google_books?search=:search
  def google_books
    data_as_hash = ExternalApi.google_books(params[:search])
    render json: data_as_hash
  end

  ############## get /google_books_by_id?title_id=:title_id
  def google_books_by_id
    user = User.find_by(id: session[:user_id])
    medium = Medium.find_by(external_id: params[:title_id])

    if medium
      render json: medium
    else
      data_as_hash = ExternalApi.google_books_by_id(params[:title_id])
      ExternalApi.budb_post(
        {
          title: data_as_hash["volumeInfo"]["title"],
          title_id: params[:title_id],
          response: data_as_hash,
          api: "google_books"
        }
      )
      Medium.create_media_and_related_objects(
        ExternalApi.convert_google_books_response_to_params_hash(
          data_as_hash,
          params[:title_id]
        ),
        user
      )
      medium = Medium.find_by(external_id: params[:title_id])
      render json: medium
    end
  end
end
