class MediaUserSerializer < ActiveModel::Serializer
  attributes :id, :rating, :review, :site_consumed, :consumed, :notes
  has_one :user
  has_one :medium
end
