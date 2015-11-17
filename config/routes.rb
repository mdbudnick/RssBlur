Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:index, :new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :websites, only: [:index, :create]
  end
end
