require 'rails_helper'

RSpec.describe "Notes", type: :request do
  describe "GET /notes" do
    it "returns paginated notes ordered by created_at desc" do
      note1 = create(:note, title: "First", created_at: 2.days.ago)
      note2 = create(:note, title: "Second", created_at: 1.day.ago)

      get notes_path

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["data"].length).to eq(2)
      expect(json["data"][0]["title"]).to eq("Second")
      expect(json["data"][1]["title"]).to eq("First")
      expect(json["pagy"]["page"]).to eq(1)
      expect(json["pagy"]["next"]).to be_nil
      expect(json["pagy"]["limit"]).to eq(10)
    end

    it "returns empty array when no notes exist" do
      get notes_path

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["data"]).to eq([])
      expect(json["pagy"]["next"]).to be_nil
    end

    it "returns next page metadata when more notes are available" do
      create_list(:note, 11)

      get notes_path

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["data"].length).to eq(10)
      expect(json["pagy"]["page"]).to eq(1)
      expect(json["pagy"]["next"]).to eq(2)

      get notes_path, params: { page: 2 }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["data"].length).to eq(1)
      expect(json["pagy"]["page"]).to eq(2)
      expect(json["pagy"]["next"]).to be_nil
    end
  end

  describe "POST /notes" do
    it "creates a note with valid params" do
      expect {
        post notes_path, params: { note: { title: "New note", content: "Content" } }
      }.to change(Note, :count).by(1)

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["title"]).to eq("New note")
      expect(json["content"]).to eq("Content")
    end

    it "creates a note with title only" do
      expect {
        post notes_path, params: { note: { title: "Title only" } }
      }.to change(Note, :count).by(1)

      expect(response).to have_http_status(:created)
    end

    it "returns errors when title is missing" do
      expect {
        post notes_path, params: { note: { content: "No title" } }
      }.not_to change(Note, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Título #{I18n.t('errors.messages.blank')}")
    end

    it "returns errors when title exceeds max length" do
      expect {
        post notes_path, params: { note: { title: "a" * (Note::TITLE_MAX_LENGTH + 1), content: "Content" } }
      }.not_to change(Note, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Título #{I18n.t('errors.messages.too_long', count: Note::TITLE_MAX_LENGTH)}")
    end

    it "returns errors when content exceeds max length" do
      expect {
        post notes_path, params: { note: { title: "Long content", content: "a" * (Note::CONTENT_MAX_LENGTH + 1) } }
      }.not_to change(Note, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Conteúdo #{I18n.t('errors.messages.too_long', count: Note::CONTENT_MAX_LENGTH)}")
    end
  end

  describe "DELETE /notes/:id" do
    it "deletes an existing note" do
      note = create(:note)

      expect {
        delete note_path(note)
      }.to change(Note, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end

    it "returns not found when note does not exist" do
      delete note_path(id: 999_999)

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Nota não encontrada")
    end
  end
end
