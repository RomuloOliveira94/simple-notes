class NotesController < ApplicationController
  def index
    set = Note.order(created_at: :desc, id: :desc)
    pagy, notes = pagy(:countless, set, limit: 10, max_limit: 50)

    render json: {
      data: notes,
      pagy: {
        page: pagy.page,
        next: pagy.next,
        limit: pagy.limit
      }
    }
  end

  def create
    @note = Note.new(note_params)

    if @note.save
      render json: @note, status: :created
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy!
    head :no_content
  rescue ActiveRecord::RecordNotFound
    render json: { errors: [ "Nota nao encontrada" ] }, status: :not_found
  end

  private

  def note_params
    params.require(:note).permit(:title, :content)
  end
end
