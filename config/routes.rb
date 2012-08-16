TableChangesRt::Application.routes.draw do
  root :to => 'table#index'
  match "/table" => "table#index"

  post "cell/change"

end
