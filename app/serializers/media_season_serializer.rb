class MediaSeasonSerializer < ActiveModel::Serializer
  attributes :id, :number
  has_one :season
  has_one :series
  has_one :medium
end
