import { ref } from 'vue'
import { translate } from '../../../app/plugins/i18n'
import {
  fetchNotesRequest,
  createNoteRequest,
  updateNoteRequest,
  deleteNoteRequest
} from '../api/notesApi'

function normalizeError(err, fallback) {
  if (Array.isArray(err)) {
    return err
  }

  return [err?.message || fallback]
}

export function useNotes() {
  const notes = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchNotes() {
    loading.value = true
    error.value = null

    try {
      const response = await fetchNotesRequest()

      if (!response.ok) {
        throw new Error(translate('errors.fetchNotes', { status: response.status }))
      }

      notes.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function createNote(noteData) {
    loading.value = true
    error.value = null

    try {
      const response = await createNoteRequest(noteData)

      if (!response.ok) {
        const data = await response.json()
        throw data.errors || [translate('errors.createNote')]
      }

      return await response.json()
    } catch (err) {
      error.value = normalizeError(err, translate('errors.createNote'))
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateNote(id, noteData) {
    loading.value = true
    error.value = null

    try {
      const response = await updateNoteRequest(id, noteData)

      if (!response.ok) {
        const data = await response.json()
        throw data.errors || [translate('errors.updateNote')]
      }

      return await response.json()
    } catch (err) {
      error.value = normalizeError(err, translate('errors.updateNote'))
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteNote(id) {
    loading.value = true
    error.value = null

    try {
      const response = await deleteNoteRequest(id)

      if (!response.ok) {
        throw new Error(translate('errors.deleteNote'))
      }

      return true
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote
  }
}
