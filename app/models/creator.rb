class Creator < ApplicationRecord
  has_many :media_creators
  has_many :media, through: :media_creators

  validates :name, presence: true, uniqueness: true
end
