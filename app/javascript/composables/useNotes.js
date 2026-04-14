import { ref, computed } from 'vue'

export function useNotes() {
  const notes = ref([])
  const loading = ref(false)
  const error = ref(null)

  const csrfToken = computed(() => {
    const meta = document.querySelector('meta[name="csrf-token"]')
    return meta ? meta.content : ''
  })

  const headers = computed(() => ({
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken.value
  }))

  async function fetchNotes() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/notes')
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar anotações: ${response.status}`)
      }

      notes.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Erro ao buscar anotações:', err)
    } finally {
      loading.value = false
    }
  }

  async function createNote(noteData) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/notes', {
        method: 'POST',
        headers: headers.value,
        body: JSON.stringify({ note: noteData })
      })

      if (!response.ok) {
        const data = await response.json()
        throw data.errors || ['Erro ao criar anotação']
      }

      return await response.json()
    } catch (err) {
      error.value = Array.isArray(err) ? err : [err.message || 'Erro ao criar anotação']
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateNote(id, noteData) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/notes/${id}`, {
        method: 'PATCH',
        headers: headers.value,
        body: JSON.stringify({ note: noteData })
      })

      if (!response.ok) {
        const data = await response.json()
        throw data.errors || ['Erro ao atualizar anotação']
      }

      return await response.json()
    } catch (err) {
      error.value = Array.isArray(err) ? err : [err.message || 'Erro ao atualizar anotação']
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteNote(id) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/notes/${id}`, {
        method: 'DELETE',
        headers: headers.value
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir anotação')
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