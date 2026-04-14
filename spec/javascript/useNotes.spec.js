import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useNotes } from '../../app/javascript/modules/notes/composables/useNotes'
import { setLocale } from './support/i18n'

global.fetch = vi.fn()

describe('useNotes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.head.innerHTML = '<meta name="csrf-token" content="test-token">'
    setLocale('pt-BR')
  })

  describe('fetchNotes', () => {
    it('fetches notes and updates state', async () => {
      const notesData = [
        { id: 1, title: 'Note 1', content: 'Content 1' }
      ]
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => notesData
      })

      const { notes, loading, fetchNotes } = useNotes()

      expect(loading.value).toBe(false)
      await fetchNotes()

      expect(notes.value).toEqual(notesData)
      expect(loading.value).toBe(false)
    })

    it('sets error on fetch failure', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      const { error, fetchNotes } = useNotes()
      await fetchNotes()

      expect(error.value).toContain('Erro ao buscar anotacoes')
    })
  })

  describe('createNote', () => {
    it('creates a note successfully', async () => {
      const newNote = { id: 1, title: 'New', content: 'Content' }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => newNote
      })

      const { createNote } = useNotes()
      const result = await createNote({ title: 'New', content: 'Content' })

      expect(result).toEqual(newNote)
      expect(global.fetch).toHaveBeenCalledWith('/notes', expect.objectContaining({
        method: 'POST'
      }))
    })

    it('throws errors on create failure', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ errors: ['Title can\'t be blank'] })
      })

      const { createNote } = useNotes()

      await expect(createNote({ title: '' })).rejects.toEqual(['Title can\'t be blank'])
    })
  })

  describe('deleteNote', () => {
    it('deletes a note successfully', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true })

      const { deleteNote } = useNotes()
      const result = await deleteNote(1)

      expect(result).toBe(true)
      expect(global.fetch).toHaveBeenCalledWith('/notes/1', expect.objectContaining({
        method: 'DELETE'
      }))
    })

    it('throws error on delete failure', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false })

      const { deleteNote } = useNotes()

      await expect(deleteNote(1)).rejects.toThrow('Erro ao excluir anotacao')
    })
  })
})
