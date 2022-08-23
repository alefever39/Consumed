class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  IMDB_API_KEY = ENV["IMDB_API_KEY"]
  GOOGLE_BOOKS_API_KEY = ENV["GOOGLE_BOOKS_API_KEY"]
end
