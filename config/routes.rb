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

  get "/me", to: "user#show"

  get "*path",
      to: "fallback#index",
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
