<template>
  <div>
    <h2 class="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
      {{ notes.length }} anotação{{ notes.length !== 1 ? 'es' : '' }}
    </h2>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-5 h-5 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin"></div>
    </div>

    <div v-else-if="notes.length === 0" class="text-center py-12">
      <p class="text-sm text-stone-400">Nenhuma anotação ainda.</p>
    </div>

    <ul v-else class="space-y-3">
      <li
        v-for="note in notes"
        :key="note.id"
        class="group p-4 bg-white border border-stone-200 rounded-lg hover:border-stone-300 transition-colors"
      >
        <h3 class="text-sm font-semibold text-stone-900">{{ note.title }}</h3>
        <p v-if="note.content" class="mt-1 text-sm text-stone-500 leading-relaxed">
          {{ note.content }}
        </p>
        <time
          v-if="note.created_at"
          class="mt-2 block text-xs text-stone-400"
        >
          {{ formatDate(note.created_at) }}
        </time>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NoteList',
  props: {
    notes: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>
