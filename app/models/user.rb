class User < ApplicationRecord
  has_many :media_users
  has_many :media, through: :media_users

  has_secure_password

  validates :first_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end
