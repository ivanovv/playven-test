require 'auth'

class AuthService

  class << self

    def user_from_payload(payload)
      payload && payload["sub"] && User.find_by(id: payload["sub"])
    end

    def user_to_token(user)
      payload = user_payload(user)
      Auth.encode(payload)
    end

    def user_payload(user)
      {
        sub: user.id,
        scopes: user.is_admin? ? ["ADMIN"] : []
        exp: 30.seconds.from_now.to_i
      }
    end

    def decode(token)
      Auth.decode(token)
    end

  end

end
