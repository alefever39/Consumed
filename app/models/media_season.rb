class MediaSeason < ApplicationRecord
  belongs_to :season
  belongs_to :medium
  has_one :series, through: :season

  validates :number, uniqueness: { scope: :season_id }
end
