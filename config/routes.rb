TableChangesRt::Application.routes.draw do
  root :to => 'table#index'

  match "/table" => "table#index"

  resources :cell
  post "cell/change"

end
