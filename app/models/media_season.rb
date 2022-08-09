class MediaSeason < ApplicationRecord
  belongs_to :season
  belongs_to :medium

  validates :number, uniqueness: { scope: :season_id }
end
