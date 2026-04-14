<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Anotações</h2>
    <div v-if="notes.length === 0" class="text-gray-500">
      Nenhuma anotação cadastrada.
    </div>
    <ul v-else class="divide-y divide-gray-200">
      <li v-for="note in notes" :key="note.id" class="py-4">
        <h3 class="font-semibold text-gray-800">{{ note.title }}</h3>
        <p v-if="note.content" class="text-gray-600 mt-1">{{ note.content }}</p>
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
    }
  }
}
</script>
