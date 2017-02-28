class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: true

  def to_token_payload
    {
      sub: self.id,
      scopes: self.is_admin? ? ["ADMIN"] : []
    }
  end
end
