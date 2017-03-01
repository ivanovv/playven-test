class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: true
  before_save :downcase_email

  def downcase_email
    self.email = self.email.strip.downcase
  end
end
