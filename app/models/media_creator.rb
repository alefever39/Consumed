class MediaCreator < ApplicationRecord
  belongs_to :medium
  belongs_to :creator
end
