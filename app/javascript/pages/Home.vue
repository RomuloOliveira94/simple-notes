<template>
  <div class="min-h-screen bg-stone-50">
    <div class="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-16">
      <header class="mb-12 text-center sm:text-left">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Anotações
        </h1>
        <p class="mt-2 text-sm text-stone-500">
          Suas ideias, em um só lugar.
        </p>
      </header>

      <section class="mb-14 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 class="mb-5 text-sm font-semibold uppercase tracking-wider text-stone-400">
          Nova anotação
        </h2>
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
