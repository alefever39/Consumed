class MediaUserSerializer < ActiveModel::Serializer
  attributes :id, :rating, :review, :site_consumed, :consumed, :notes
  has_one :medium
  has_one :media_type
  has_many :creators
end
