class MediaSeasonSerializer < ActiveModel::Serializer
  attributes :id, :number
  has_one :season
  has_one :series
end
