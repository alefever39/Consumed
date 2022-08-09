class Series < ApplicationRecord
  has_many :seasons
  has_many :media_seasons, through: :seasons

  validates :title, presence: true, uniqueness: true
end
