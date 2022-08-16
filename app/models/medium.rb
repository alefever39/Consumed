class Medium < ApplicationRecord
  belongs_to :media_type
  has_many :media_users, dependent: :destroy
  has_many :users, through: :media_users
  has_one :media_season, dependent: :destroy
  has_one :season, through: :media_season
  has_one :series, through: :season
  has_many :media_creators, dependent: :destroy
  has_many :creators, through: :media_creators

  validates :title, presence: true, uniqueness: true
end
