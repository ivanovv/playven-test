require 'jwt'

class Auth

  ALGORITHM = 'HS256'

  class << self 
    def encode(payload)
      JWT.encode(payload, token_secret, ALGORITHM)
    end

    def decode(token)
      begin
        JWT.decode(token, token_secret, true, {algorithm: ALGORITHM }).first
      rescue JWT::VerificationError, JWT::DecodeError
        # nice to have - log these errors to NR or other service for a close look
        nil
      end
    end

    def token_secret
      Rails.application.secrets.secret_key_base
    end

  end

end
