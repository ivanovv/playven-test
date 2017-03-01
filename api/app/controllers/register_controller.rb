class RegisterController < ApplicationController
  skip_before_action :authenticate_user

  def create
    user = User.new(user_params)
    if user.save
      jwt = AuthService.user_to_token(user)
      render json: { jwt: jwt }, status: :created
    else
      render json: { error: user.errors.full_messages.join('; ') }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

end
