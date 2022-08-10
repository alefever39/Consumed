Rails.application.routes.draw do
  resources :media_users, only: [:index]
  resources :media_creators, only: [:index]
  resources :media_seasons, only: [:index]
  resources :seasons, only: [:index]
  resources :media, only: [:index]
  resources :creators, only: [:index]
  resources :series, only: [:index]
  resources :media_types, only: [:index]
  resources :users, only: [:index]

  get "/users/media", to: "users#media"

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
