class RegisterController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      token = Knock::AuthToken.new(payload: { sub: user.id })
      render json: token, status: :created
    else
      render json: {error: user.errors.full_messages.join('; ')}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

end
