require 'rails_helper'

RSpec.describe Note, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }

    it 'is invalid when title exceeds max length' do
      note = build(:note, title: 'a' * (Note::TITLE_MAX_LENGTH + 1))

      expect(note).not_to be_valid
      expect(note.errors[:title]).to include(I18n.t('errors.messages.too_long', count: Note::TITLE_MAX_LENGTH))
    end

    it 'is invalid when content exceeds max length' do
      note = build(:note, content: 'a' * (Note::CONTENT_MAX_LENGTH + 1))

      expect(note).not_to be_valid
      expect(note.errors[:content]).to include(I18n.t('errors.messages.too_long', count: Note::CONTENT_MAX_LENGTH))
    end
  end
end
