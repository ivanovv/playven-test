class ApplicationController < ActionController::API
   before_action :authenticate_user

   def logged_in?
     !!current_user 
   end

   def current_user
     @current_user ||= AuthService.user_from_payload(payload)
   end

  def authenticate_user
    render(json: {error: "login required"}, status: 401)  unless logged_in?
  end

  def payload
    raw_token = (request.authorization || '').split(' ').last
    AuthService.decode(raw_token)
  end

end
