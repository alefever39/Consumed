class MediaUser < ApplicationRecord
  belongs_to :user
  belongs_to :medium

  validates :medium_id, uniqueness: { scope: :user_id }
  validates :consumed,
            inclusion: {
              in: ["consumed", "not consumed", "consuming"]
            }
end
