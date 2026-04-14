<template>
  <div class="container mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
    <header class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="text-center sm:text-left">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {{ t('app.title') }}
        </h1>
        <p class="mt-2 text-sm text-stone-500">
          {{ t('app.subtitle') }}
        </p>
      </div>

      <label class="text-xs font-semibold uppercase tracking-wider text-stone-400">
        {{ t('app.localeLabel') }}
        <select
          v-model="currentLocale"
          class="ml-2 rounded-md border border-stone-200 bg-white px-2 py-1 text-sm font-medium text-stone-700"
        >
          <option v-for="localeOption in locales" :key="localeOption" :value="localeOption">
            {{ t(`app.locale.${localeOption}`) }}
          </option>
        </select>
      </label>
    </header>

    <section class="mb-14 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 class="mb-5 text-sm font-semibold uppercase tracking-wider text-stone-400">
        {{ t('noteForm.sectionTitle') }}
      </h2>
      <NoteForm @note-created="fetchNotes" />
    </section>

    <section>
      <NoteList :notes="notes" :loading="loading" />
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '../../../app/plugins/i18n'
import NoteForm from '../components/NoteForm.vue'
import NoteList from '../components/NoteList.vue'
import { useNotes } from '../composables/useNotes'

defineOptions({ name: 'HomePage' })

const { t, locale } = useI18n()
const { notes, loading, fetchNotes } = useNotes()

const locales = SUPPORTED_LOCALES
const currentLocale = computed({
  get() {
    return locale.value
  },
  set(nextLocale) {
    locale.value = nextLocale
    document.documentElement.lang = nextLocale
  }
})

onMounted(() => {
  fetchNotes()
})
</script>
