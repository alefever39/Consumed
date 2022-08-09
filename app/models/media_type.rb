class MediaType < ApplicationRecord
  has_many :media

  validates :media_type, presence: true, uniqueness: true
end
