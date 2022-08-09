class MediaCreatorSerializer < ActiveModel::Serializer
  attributes :id
  has_one :medium
  has_one :creator
end
