import { createHttpClient } from '@shared/api/httpClient'

const http = createHttpClient()

export async function fetchNotesRequest({ page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  })

  return http.get(`/notes?${params.toString()}`)
}

export async function createNoteRequest(noteData) {
  return http.post('/notes', { note: noteData })
}

export async function updateNoteRequest(id, noteData) {
  return http.patch(`/notes/${id}`, { note: noteData })
}

export async function deleteNoteRequest(id) {
  return http.delete(`/notes/${id}`)
}
