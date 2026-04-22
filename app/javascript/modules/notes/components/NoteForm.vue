<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label
        for="title"
        class="mb-1.5 block text-sm font-medium text-stone-600"
      >
        {{ t("noteForm.titleLabel") }}
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        :maxlength="NOTE_TITLE_MAX_LENGTH"
        :placeholder="t('noteForm.titlePlaceholder')"
        :class="[
          'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors',
          'placeholder:text-stone-400',
          'focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10',
          errors.title
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
            : 'border-stone-200',
        ]"
      />
      <p v-if="errors.title" class="mt-1.5 text-xs text-red-500">
        {{ errors.title }}
      </p>
    </div>

    <div>
      <label
        for="content"
        class="mb-1.5 block text-sm font-medium text-stone-600"
      >
        {{ t("noteForm.contentLabel") }}
      </label>
      <textarea
        id="content"
        v-model="form.content"
        rows="3"
        :maxlength="NOTE_CONTENT_MAX_LENGTH"
        :placeholder="t('noteForm.contentPlaceholder')"
        :class="[
          'w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors',
          'placeholder:text-stone-400',
          'focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10',
          errors.content
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
            : 'border-stone-200',
        ]"
      ></textarea>
      <p v-if="errors.content" class="mt-1.5 text-xs text-red-500">
        {{ errors.content }}
      </p>
      <p
        class="mt-1.5 text-right text-xs"
        :class="contentCharacters >= NOTE_CONTENT_MAX_LENGTH ? 'text-red-500' : 'text-stone-500'"
      >
        {{
          contentCharacters >= NOTE_CONTENT_MAX_LENGTH
            ? t('noteForm.errors.contentLimitReached', { count: NOTE_CONTENT_MAX_LENGTH })
            : t('noteForm.contentCounter', { count: contentCharacters, max: NOTE_CONTENT_MAX_LENGTH })
        }}
      </p>
    </div>

    <p v-if="errors.general" class="text-xs text-red-500">
      {{ errors.general }}
    </p>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full rounded-lg bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 active:bg-stone-700 sm:w-auto"
      :class="isSubmitting ? 'cursor-not-allowed opacity-70' : ''"
    >
      {{ isSubmitting ? t("noteForm.submitting") : t("noteForm.submit") }}
    </button>
  </form>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { useNoteForm } from "../composables/useNoteForm";
  import { NOTE_CONTENT_MAX_LENGTH, NOTE_TITLE_MAX_LENGTH } from "../constants/noteValidation";

  defineOptions({ name: "NoteForm" });

  const emit = defineEmits(["note-created"]);
  const { t } = useI18n();
  const { form, errors, isSubmitting, submit } = useNoteForm();
  const contentCharacters = computed(() => form.content.length);

  async function handleSubmit() {
    const success = await submit();

    if (success) {
      emit("note-created");
    }
  }
</script>
