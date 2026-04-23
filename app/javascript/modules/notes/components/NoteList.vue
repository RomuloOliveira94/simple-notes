<template>
  <div>
    <h2
      class="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-400"
    >
      {{ countLabel }}
    </h2>

    <div
      v-if="loading && notes.length === 0"
      class="flex items-center justify-center py-12"
    >
      <div
        class="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900"
      />
    </div>

    <div v-else-if="notes.length === 0" class="py-12 text-center">
      <p class="text-sm text-stone-400">{{ t("noteList.empty") }}</p>
    </div>

    <ul v-if="notes.length > 0" class="space-y-3">
      <li
        v-for="note in notes"
        :key="note.id"
        class="group relative rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:border-stone-300"
      >
        <button
          type="button"
          class="absolute right-3 top-3 rounded px-1 text-sm font-bold text-red-500 transition-colors hover:cursor-pointer hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="deletingId === note.id"
          :aria-label="t('noteList.deleteAriaLabel')"
          @click="$emit('delete-note', note)"
        >
          X
        </button>

        <h3 class="pr-8 text-sm font-semibold break-all text-stone-900">
          {{ note.title }}
        </h3>
        <p
          v-if="note.content"
          class="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-stone-500"
        >
          {{ note.content }}
        </p>
        <time v-if="note.created_at" class="mt-2 block text-xs text-stone-400">
          {{ formatDate(note.created_at) }}
        </time>
      </li>
    </ul>

    <div v-if="loadingMore" class="py-5 text-center">
      <p class="text-xs text-stone-400">{{ t("noteList.loadingMore") }}</p>
    </div>

    <div v-else-if="!hasMore && notes.length > 0" class="py-5 text-center">
      <p class="text-xs text-stone-400">{{ t("noteList.endOfList") }}</p>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";

  defineOptions({ name: "NoteList" });

  defineEmits(["delete-note"]);

  const props = defineProps({
    notes: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    deletingId: {
      type: Number,
      default: null,
    },
    loadingMore: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  });

  const { t, locale } = useI18n();

  const countLabel = computed(() => {
    if (props.notes.length === 1) {
      return t("noteList.countOne", { count: props.notes.length });
    }

    return t("noteList.countOther", { count: props.notes.length });
  });

  function formatDate(dateString) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat(locale.value, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }
</script>
