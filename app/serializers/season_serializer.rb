class SeasonSerializer < ActiveModel::Serializer
  attributes :id, :title, :number, :description, :rating, :media_quantity
  has_one :series
end
