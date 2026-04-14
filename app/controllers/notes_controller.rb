class NotesController < ApplicationController
  def index
    @notes = Note.order(created_at: :desc)
    render json: @notes
  end

  def create
    @note = Note.new(note_params)

    if @note.save
      render json: @note, status: :created
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :content)
  end
end
