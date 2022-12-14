Rails.application.routes.draw do
  resources :media_users, only: %i[index create destroy]
  resources :media_creators, only: [:index]
  resources :media_seasons, only: [:index]
  resources :seasons, only: [:index]
  resources :media, only: %i[index show create update]
  resources :creators, only: [:index]
  resources :series, only: [:index]
  resources :media_types, only: [:index]
  resources :users, only: [:index]

  get "/users/media", to: "users#media"
  get "/media/:id/media_series", to: "media#mediaSeries"

  get "/imdb", to: "external_api#imdb"
  get "/imdb_by_id", to: "external_api#imdb_by_id"

  get "/google_books", to: "external_api#google_books"
  get "/google_books_by_id", to: "external_api#google_books_by_id"

  get "/budb_get_all", to: "external_api#budb_get_all"
  get "/get_database_responses", to: "external_api#get_database_responses"
  post "/budb_post", to: "external_api#budb_post"

  #################### User Auth
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  ################### Render Frontend
  get "*path",
      to: "fallback#index",
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
