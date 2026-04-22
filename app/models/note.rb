class Note < ApplicationRecord
  TITLE_MAX_LENGTH = 120
  CONTENT_MAX_LENGTH = 5000

  validates :title, presence: true, length: { maximum: TITLE_MAX_LENGTH }
  validates :content, length: { maximum: CONTENT_MAX_LENGTH }, allow_nil: true
end
