import { createHttpClient } from '@shared/api/httpClient'

const http = createHttpClient()

export async function fetchNotesRequest() {
  return http.get('/notes')
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
