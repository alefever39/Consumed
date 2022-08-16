class SeasonSerializer < ActiveModel::Serializer
  attributes :id, :title, :number, :description, :rating, :season_exists
  has_one :series
end
