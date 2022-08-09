class SeriesSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :media_quantity, :season_quantity
end
