function csrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]')
  return meta ? meta.content : ''
}

function jsonHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken()
  }
}

export async function fetchNotesRequest() {
  return fetch('/notes')
}

export async function createNoteRequest(noteData) {
  return fetch('/notes', {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ note: noteData })
  })
}

export async function updateNoteRequest(id, noteData) {
  return fetch(`/notes/${id}`, {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify({ note: noteData })
  })
}

export async function deleteNoteRequest(id) {
  return fetch(`/notes/${id}`, {
    method: 'DELETE',
    headers: jsonHeaders()
  })
}
