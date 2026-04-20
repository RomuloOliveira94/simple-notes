import { ref } from 'vue'
import { translate } from '@app/plugins/i18n'
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

  if (typeof err === 'string' && err.trim().length > 0) {
    return [err]
  }

  if (err?.name === 'AbortError') {
    return [translate('errors.requestTimeout')]
  }

  return [err?.message || fallback]
}

export function useNotes() {
  const notes = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref(null)
  const pagination = ref({
    page: 1,
    next: null,
    limit: 10,
    hasMore: true
  })

  async function fetchNotes({ page = 1, append = false } = {}) {
    if (append) {
      loadingMore.value = true
    } else {
      loading.value = true
    }

    error.value = null

    try {
      const response = await fetchNotesRequest({
        page,
        limit: pagination.value.limit
      })

      if (!response.ok) {
        throw new Error(translate('errors.fetchNotes', { status: response.status }))
      }

      const payload = await response.json()
      const records = Array.isArray(payload?.data) ? payload.data : []
      const pagyData = payload?.pagy || {}

      notes.value = append ? [...notes.value, ...records] : records
      pagination.value = {
        page: pagyData.page || page,
        next: pagyData.next ?? null,
        limit: pagyData.limit || pagination.value.limit,
        hasMore: Boolean(pagyData.next)
      }
    } catch (err) {
      error.value = normalizeError(err, translate('errors.fetchNotes'))
      console.error(err)
    } finally {
      if (append) {
        loadingMore.value = false
      } else {
        loading.value = false
      }
    }
  }

  async function fetchNextPage() {
    if (!pagination.value.hasMore || loadingMore.value || loading.value) {
      return
    }

    await fetchNotes({ page: pagination.value.next, append: true })
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
      error.value = normalizeError(err, translate('errors.deleteNote'))
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    notes,
    loading,
    loadingMore,
    error,
    pagination,
    fetchNotes,
    fetchNextPage,
    createNote,
    updateNote,
    deleteNote
  }
}
