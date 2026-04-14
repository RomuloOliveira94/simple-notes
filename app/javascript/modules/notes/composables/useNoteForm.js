import { reactive } from 'vue'
import { translate } from '../../../app/plugins/i18n'
import { createNoteRequest } from '../api/notesApi'

export function useNoteForm() {
  const form = reactive({
    title: '',
    content: ''
  })

  const errors = reactive({})

  function resetErrors() {
    Object.keys(errors).forEach((key) => {
      delete errors[key]
    })
  }

  function parseErrors(errorMessages = []) {
    errorMessages.forEach((message) => {
      const normalized = message.toLowerCase()

      if (normalized.includes('title') || normalized.includes('titulo')) {
        errors.title = message
      } else if (normalized.includes('content') || normalized.includes('cont')) {
        errors.content = message
      } else {
        errors.general = message
      }
    })
  }

  async function submit() {
    resetErrors()

    try {
      const response = await createNoteRequest(form)

      if (!response.ok) {
        const data = await response.json()
        parseErrors(data.errors)
        return false
      }

      form.title = ''
      form.content = ''
      return true
    } catch (err) {
      errors.general = translate('errors.saveNote')
      return false
    }
  }

  return {
    form,
    errors,
    submit
  }
}
