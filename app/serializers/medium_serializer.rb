class MediumSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :release_date,
             :description,
             :global_rating,
             :publisher,
             :genre,
             :image
  has_one :media_type
end
