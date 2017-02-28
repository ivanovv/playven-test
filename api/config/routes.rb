Rails.application.routes.draw do
  namespace 'auth', module: nil do
    post 'user_token' => 'user_token#create'
    post 'register' => 'register#create'
  end
  get 'protected' => 'protected#index'
  get 'super-protected' => 'protected#admin'
end
