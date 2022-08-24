require "open-uri"
require "net/http"

class ExternalApi < ApplicationRecord
  include Concurrent::Async

  IMDB_API_KEY = ENV["IMDB_KEY"]
  GOOGLE_BOOKS_API_KEY = ENV["GOOGLE_BOOKS_KEY"]

  def self.budb_get_all
    url = "https://consumed-media-backup-database.herokuapp.com/external_apis"
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    media = JSON.parse(response.body)
    # send_media = media.map { |medium| }
  end

  def self.budb_post(post_object)
    ###### expected post_object
    ###### {
    ###### title: title,
    ###### title_id: title_id,
    ###### response: response,
    ###### api: api
    ###### }
    url = "https://consumed-media-backup-database.herokuapp.com/external_apis"
    uri = URI.parse(url)
    response = Net::HTTP.post_form(uri, post_object)
    JSON.parse(response.body)
  end

  def self.imdb(search)
    url = "https://imdb-api.com/en/API/SearchAll/#{IMDB_API_KEY}/#{search}"
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def self.imdb_by_id(title_id)
    url = "https://imdb-api.com/en/API/Title/#{IMDB_API_KEY}/#{title_id}"
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def self.convert_imdb_response_to_params_hash(response_hash, title_id)
    if response_hash["type"] == "TVSeries"
      media_type = "tv show"
      season_exists = true
      series_exists = true
      series_title = response_hash["title"]
      season_number = 1
      media_number = 1
    else
      media_type = response_hash["type"].downcase
      season_exists = false
      series_exists = false
      season_number = 1
      media_number = 1
    end

    date_array = response_hash["releaseDate"].split("-")
    year = date_array[0].to_i
    month = date_array[1].to_i
    date = date_array[2].to_i

    params_hash = {
      media_type: media_type,
      year: year,
      month: month,
      date: date,
      title: response_hash["title"],
      description: response_hash["plot"],
      image: response_hash["image"],
      consumed: "not consumed",
      series_exists: series_exists,
      series_title: series_title,
      season_number: season_number,
      season_exists: season_exists,
      media_number: media_number,
      external_id: title_id
    }
  end

  ###################################################### NOT FINISHED!!!
  def get_imdb_data(seed_title_id, number_of_times)
    title_id = seed_title_id

    number_of_times.times do
      data_as_hash = ExternalApi.imdb_by_id(title_id)

      ExternalApi.budb_post(
        {
          title: data_as_hash["title"],
          title_id: title_id,
          response: data_as_hash,
          api: "imdb"
        }
      )

      Medium.create_media_and_related_objects(
        ExternalApi.convert_imdb_response_to_params_hash(
          data_as_hash,
          title_id
        ),
        user
      )

      title_id = data_as_hash ###### this is where I left off. I need to figure out what the response looks like to get the next id.
    end
  end

  def self.google_books(search)
    url =
      "https://www.googleapis.com/books/v1/volumes?q=#{search}&key=#{GOOGLE_BOOKS_API_KEY}"
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def self.google_books_by_id(title_id)
    url =
      "https://www.googleapis.com/books/v1/volumes/#{title_id}?key=#{GOOGLE_BOOKS_API_KEY}"
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def self.convert_google_books_response_to_params_hash(response_hash, title_id)
    media_type = "book"
    season_number = 1
    media_number = 1
    season_exists = false
    series_exists = false
    date_array = response_hash["volumeInfo"]["publishedDate"].split("-")
    year = date_array[0].to_i
    month = date_array[1].to_i
    date = date_array[2].to_i

    params_hash = {
      media_type: media_type,
      year: year,
      month: month,
      date: date,
      title: response_hash["volumeInfo"]["title"],
      description: response_hash["volumeInfo"]["description"],
      image: response_hash["volumeInfo"]["imageLinks"]["thumbnail"],
      consumed: "not consumed",
      series_exists: series_exists,
      season_number: season_number,
      season_exists: season_exists,
      media_number: media_number,
      external_id: title_id
    }
  end
end
