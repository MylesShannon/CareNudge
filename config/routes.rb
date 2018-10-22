Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/doctors/reviews', to: 'doctors#index_with_reviews'
  
  resources :doctors do
    resources :reviews
  end

  get '/doctors/search/:query', to: 'search#doctors'
  get '/doctors/reviews/search/:query', to: 'search#reviews'
end
