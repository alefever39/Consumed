class Season < ApplicationRecord
  belongs_to :series
  has_many :media_seasons
  has_many :medium, through: :media_seasons

  validates :number, presence: true, uniqueness: { scope: :series_id }
end
