<template>
  <div class="min-h-screen bg-stone-50">
    <div class="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <header class="mb-10">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          Anotações
        </h1>
        <p class="mt-1 text-sm text-stone-500">
          Suas ideias, em um só lugar.
        </p>
      </header>

      <section class="mb-12">
        <NoteForm @note-created="fetchNotes" />
      </section>

      <section>
        <NoteList :notes="notes" :loading="loading" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNotes } from '../composables/useNotes'
import NoteForm from '../components/NoteForm.vue'
import NoteList from '../components/NoteList.vue'

const { notes, loading, fetchNotes } = useNotes()

onMounted(() => {
  fetchNotes()
})
</script>
