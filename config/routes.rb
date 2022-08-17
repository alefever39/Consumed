Rails.application.routes.draw do
  resources :media_users, only: %i[index destroy]
  resources :media_creators, only: [:index]
  resources :media_seasons, only: [:index]
  resources :seasons, only: [:index]
  resources :media, only: %i[index create update]
  resources :creators, only: [:index]
  resources :series, only: [:index]
  resources :media_types, only: [:index]
  resources :users, only: [:index]

  get "/users/media", to: "users#media"
  get "/media/:id/media_series", to: "media#mediaSeries"

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
