class Medium < ApplicationRecord
  belongs_to :media_type
  has_many :media_users
  has_many :users, through: :media_users
  has_many :media_seasons
  has_many :seasons, through: :media_seasons
  has_many :media_creators
  has_many :creators, through: :media_creators

  validates :title, presence: true, uniqueness: true
end
