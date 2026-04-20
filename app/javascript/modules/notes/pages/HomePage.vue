<template>
  <div class="container mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
    <header class="mb-12 text-center sm:text-left">
      <img
        src="/simple-notes.png"
        :alt="t('app.title')"
        class="mx-auto h-12 w-auto sm:mx-0"
      />
    </header>

    <section
      class="mb-14 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2
        class="mb-5 text-sm font-semibold uppercase tracking-wider text-stone-400"
      >
        {{ t("noteForm.sectionTitle") }}
      </h2>
      <NoteForm @note-created="fetchNotes" />
    </section>

    <section>
      <NoteList
        :notes="notes"
        :loading="loading"
        :loading-more="loadingMore"
        :has-more="pagination.hasMore"
        :deleting-id="deletingId"
        @delete-note="handleDeleteNote"
      />

      <div ref="infiniteScrollAnchor" class="h-1" aria-hidden="true" />
    </section>
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import NoteForm from "../components/NoteForm.vue";
  import NoteList from "../components/NoteList.vue";
  import { useNotes } from "../composables/useNotes";

  defineOptions({ name: "HomePage" });

  const { t } = useI18n();
  const {
    notes,
    loading,
    loadingMore,
    pagination,
    fetchNotes,
    fetchNextPage,
    deleteNote,
  } = useNotes();
  const deletingId = ref(null);
  const infiniteScrollAnchor = ref(null);
  const observer = ref(null);

  onMounted(async () => {
    await fetchNotes();
    setupInfiniteScroll();
  });

  onBeforeUnmount(() => {
    observer.value?.disconnect();
  });

  function setupInfiniteScroll() {
    if (!window.IntersectionObserver || !infiniteScrollAnchor.value) {
      return;
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        fetchNextPage();
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "200px 0px",
      },
    );

    observer.value.observe(infiniteScrollAnchor.value);
  }

  async function handleDeleteNote(note) {
    const confirmed = window.confirm(
      t("noteList.deleteConfirm", { title: note.title }),
    );

    if (!confirmed) {
      return;
    }

    deletingId.value = note.id;

    try {
      await deleteNote(note.id);
      await fetchNotes({ page: 1, append: false });
    } finally {
      deletingId.value = null;
    }
  }
</script>
