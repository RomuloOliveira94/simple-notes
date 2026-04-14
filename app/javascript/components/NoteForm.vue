<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-stone-600 mb-1.5">
        Título
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        placeholder="Dê um nome à anotação"
        :class="[
          'w-full px-3.5 py-2.5 text-sm border rounded-lg bg-white transition-colors outline-none',
          'focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900',
          'placeholder:text-stone-400',
          errors.title ? 'border-red-400 focus:ring-red-400/10 focus:border-red-400' : 'border-stone-200'
        ]"
      />
      <p v-if="errors.title" class="mt-1.5 text-xs text-red-500">{{ errors.title }}</p>
    </div>

    <div>
      <label for="content" class="block text-sm font-medium text-stone-600 mb-1.5">
        Conteúdo
      </label>
      <textarea
        id="content"
        v-model="form.content"
        placeholder="Escreva algo..."
        rows="3"
        :class="[
          'w-full px-3.5 py-2.5 text-sm border rounded-lg bg-white transition-colors outline-none resize-none',
          'focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900',
          'placeholder:text-stone-400',
          errors.content ? 'border-red-400 focus:ring-red-400/10 focus:border-red-400' : 'border-stone-200'
        ]"
      ></textarea>
      <p v-if="errors.content" class="mt-1.5 text-xs text-red-500">{{ errors.content }}</p>
    </div>

    <p v-if="errors.general" class="text-xs text-red-500">{{ errors.general }}</p>

    <button
      type="submit"
      class="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 active:bg-stone-700 transition-colors"
    >
      Salvar
    </button>
  </form>
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
