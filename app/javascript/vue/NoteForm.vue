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
          :class="[
            'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none',
            errors.title ? 'border-red-500' : 'border-gray-300'
          ]"
        />
        <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
      </div>
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Conteúdo:</label>
        <textarea
          id="content"
          v-model="form.content"
          placeholder="Digite o conteúdo..."
          rows="4"
          :class="[
            'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none',
            errors.content ? 'border-red-500' : 'border-gray-300'
          ]"
        ></textarea>
        <p v-if="errors.content" class="mt-1 text-sm text-red-600">{{ errors.content }}</p>
      </div>
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
      errors: {}
    }
  },
  methods: {
    async handleSubmit() {
      this.errors = {}

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
          this.parseErrors(data.errors)
        }
      } catch (err) {
        this.errors.general = 'Erro ao salvar anotação'
      }
    },
    parseErrors(errorMessages) {
      errorMessages.forEach(message => {
        if (message.toLowerCase().includes('título')) {
          this.errors.title = message
        } else if (message.toLowerCase().includes('cont')) {
          this.errors.content = message
        } else {
          this.errors.title = message
        }
      })
    }
  }
}
</script>
