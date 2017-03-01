require 'test_helper'

class RegisterControllerTest < ActionController::TestCase
  test 'user is created when attrs are correct' do
    user_attrs = { name: 'John', email: 'j@example.com', password: 'sekret' }
    post :create, params: { user: user_attrs }
    assert_response :success
  end

  test 'user is not created when email is already taken' do
    user_attrs = { name: 'John', email: 'j@example.com', password: 'sekret' }
    User.create user_attrs
    post :create, params: { user: user_attrs }
    assert_response :unprocessable_entity
  end

end
