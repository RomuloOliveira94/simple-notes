import { reactive, ref } from 'vue'
import { translate } from '@app/plugins/i18n'
import { createNoteRequest } from '../api/notesApi'
import { NOTE_CONTENT_MAX_LENGTH, NOTE_TITLE_MAX_LENGTH } from '../constants/noteValidation'

export function useNoteForm() {
  const form = reactive({
    title: '',
    content: ''
  })

  const errors = reactive({})
  const isSubmitting = ref(false)

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

  function validateForm() {
    let isValid = true

    if (form.title.trim().length === 0) {
      errors.title = translate('noteForm.errors.titleRequired')
      isValid = false
    } else if (form.title.length > NOTE_TITLE_MAX_LENGTH) {
      errors.title = translate('noteForm.errors.titleTooLong', { count: NOTE_TITLE_MAX_LENGTH })
      isValid = false
    }

    if (form.content.length > NOTE_CONTENT_MAX_LENGTH) {
      errors.content = translate('noteForm.errors.contentTooLong', { count: NOTE_CONTENT_MAX_LENGTH })
      isValid = false
    }

    return isValid
  }

  async function submit() {
    if (isSubmitting.value) {
      return false
    }

    resetErrors()

    if (!validateForm()) {
      return false
    }

    isSubmitting.value = true

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
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    submit
  }
}
