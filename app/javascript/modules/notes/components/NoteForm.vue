<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label for="title" class="mb-1.5 block text-sm font-medium text-stone-600">
        {{ t('noteForm.titleLabel') }}
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        :placeholder="t('noteForm.titlePlaceholder')"
        :class="[
          'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors',
          'placeholder:text-stone-400',
          'focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10',
          errors.title ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-stone-200'
        ]"
      >
      <p v-if="errors.title" class="mt-1.5 text-xs text-red-500">{{ errors.title }}</p>
    </div>

    <div>
      <label for="content" class="mb-1.5 block text-sm font-medium text-stone-600">
        {{ t('noteForm.contentLabel') }}
      </label>
      <textarea
        id="content"
        v-model="form.content"
        rows="3"
        :placeholder="t('noteForm.contentPlaceholder')"
        :class="[
          'w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors',
          'placeholder:text-stone-400',
          'focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10',
          errors.content ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-stone-200'
        ]"
      ></textarea>
      <p v-if="errors.content" class="mt-1.5 text-xs text-red-500">{{ errors.content }}</p>
    </div>

    <p v-if="errors.general" class="text-xs text-red-500">{{ errors.general }}</p>

    <button
      type="submit"
      class="w-full rounded-lg bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 active:bg-stone-700 sm:w-auto"
    >
      {{ t('noteForm.submit') }}
    </button>
  </form>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useNoteForm } from '../composables/useNoteForm'

defineOptions({ name: 'NoteForm' })

const emit = defineEmits(['note-created'])
const { t } = useI18n()
const { form, errors, submit } = useNoteForm()

async function handleSubmit() {
  const success = await submit()

  if (success) {
    emit('note-created')
  }
}
</script>
