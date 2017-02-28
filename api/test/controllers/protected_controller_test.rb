require 'test_helper'

class ProtectedControllerTest < ActionController::TestCase
  test 'protected action returns 401 when there is no token' do
    get :index
    assert_response :unauthorized
  end

  test 'protected action returns 200 when there is a token present' do
    user = User.create(name: 'John', email: 'j@example.com', password: 'sekret')
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    @request.headers['Authorization'] = token
    get :index
    assert_response :success
  end

end
