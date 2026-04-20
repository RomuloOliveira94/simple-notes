Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :notes, only: [ :index, :create, :destroy ], defaults: { format: :json }

  root "pages#home"
end
