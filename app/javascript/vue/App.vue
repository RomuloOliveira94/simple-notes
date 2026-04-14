<template>
  <div class="max-w-2xl mx-auto p-6">
    <NoteForm @note-created="fetchNotes" />
    <NoteList :notes="notes" />
  </div>
</template>

<script>
import NoteForm from './NoteForm.vue'
import NoteList from './NoteList.vue'

export default {
  name: 'App',
  components: { NoteForm, NoteList },
  data() {
    return {
      notes: []
    }
  },
  mounted() {
    this.fetchNotes()
  },
  methods: {
    async fetchNotes() {
      try {
        const response = await fetch('/notes.json')
        this.notes = await response.json()
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
  }
}
</script>
