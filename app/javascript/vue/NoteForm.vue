<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Nova anotação</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título:</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Digite o título"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Conteúdo:</label>
        <textarea
          id="content"
          v-model="form.content"
          placeholder="Digite o conteúdo..."
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        ></textarea>
      </div>
      <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
      <button
        type="submit"
        class="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Salvar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NoteForm',
  emits: ['note-created'],
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      error: null
    }
  },
  methods: {
    async handleSubmit() {
      this.error = null

      try {
        const response = await fetch('/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({ note: this.form })
        })

        if (response.ok) {
          this.form.title = ''
          this.form.content = ''
          this.$emit('note-created')
        } else {
          const data = await response.json()
          this.error = data.errors.join(', ')
        }
      } catch (err) {
        this.error = 'Erro ao salvar anotação'
      }
    }
  }
}
</script>
