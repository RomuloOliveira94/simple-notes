<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Anotações</h1>
    <NoteForm @note-created="fetchNotes" />
    <NoteList :notes="notes" :loading="loading" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNotes } from '../composables/useNotes'
import NoteForm from '../components/NoteForm.vue'
import NoteList from '../components/NoteList.vue'

const { notes, loading, error, fetchNotes } = useNotes()

onMounted(() => {
  fetchNotes()
})
</script>