class UserTokenController < ApplicationController
  skip_before_action :authenticate_user

  def create
    user = User.find_by(email: auth_params[:email].downcase)
    if user && user.authenticate(auth_params[:password])
      jwt = AuthService.user_to_token(user)
      render json: { jwt: jwt }
    else
      head :not_found
    end
  end

  private

  def auth_params
    params.require(:auth).permit(:email, :password)
  end
end
