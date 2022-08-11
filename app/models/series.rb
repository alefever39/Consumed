class Series < ApplicationRecord
  has_many :seasons
  has_many :media_seasons, through: :seasons
  has_many :medium, through: :media_seasons

  validates :title, presence: true, uniqueness: true
end
