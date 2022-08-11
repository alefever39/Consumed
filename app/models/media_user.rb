class MediaUser < ApplicationRecord
  belongs_to :user
  belongs_to :medium
  has_one :media_type, through: :medium
  has_one :media_season, through: :medium
  has_many :media_creators, through: :medium
  has_many :creators, through: :media_creators

  validates :medium_id, uniqueness: { scope: :user_id }
  validates :consumed,
            inclusion: {
              in: ["consumed", "not consumed", "consuming"]
            }
end
