class NotesController < ApplicationController
  def index
    set = Note.order(created_at: :desc, id: :desc)
    @pagy, @notes = pagy(:countless, set, limit: 10, max_limit: 50)

    render :index
  end

  def create
    @note = Note.new(note_params)

    if @note.save
      render :create, status: :created
    else
      @errors = @note.errors.full_messages
      render :errors, status: :unprocessable_entity
    end
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy!
    head :no_content
  rescue ActiveRecord::RecordNotFound
    @errors = [ I18n.t("notes.errors.not_found") ]
    render :errors, status: :not_found
  end

  private

  def note_params
    params.require(:note).permit(:title, :content)
  end
end
