require "open-uri"
require "net/http"

class ExternalApi < ApplicationRecord
  def self.budb_get_all
    url = "https://consumed-media-backup-database.herokuapp.com/external_apis"
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def self.budb_post(post_object)
    url = "https://consumed-media-backup-database.herokuapp.com/external_apis"
    uri = URI.parse(url)
    response = Net::HTTP.post_form(uri, post_object)
    JSON.parse(response.body)
  end

  def self.imdb(search)
    imdb_api_key = "k_14g9551s"
    url = "https://imdb-api.com/en/API/SearchAll/#{imdb_api_key}/#{search}"
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end

  def self.imdb_by_id(title_id)
    imdb_api_key = "k_14g9551s"
    url =
      "https://imdb-api.com/en/API/Title/#{imdb_api_key}/#{title_id}/Wikipedia,"
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    JSON.parse(response.body)
  end
end
