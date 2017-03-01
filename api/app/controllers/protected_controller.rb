class ProtectedController < ApplicationController

  def index
    render json: { content: 'protected content' }
  end

  def admin
    if current_user.is_admin
      render json: { content: 'Super protected content' }
    else
      head :forbidden
    end
  end

end
