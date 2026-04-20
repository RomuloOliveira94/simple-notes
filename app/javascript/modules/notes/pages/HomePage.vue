<template>
  <div class="container mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
    <header class="mb-12 text-center sm:text-left">
      <h1 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        {{ t("app.title") }}
      </h1>
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
        :deleting-id="deletingId"
        @delete-note="handleDeleteNote"
      />
    </section>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import NoteForm from "../components/NoteForm.vue";
  import NoteList from "../components/NoteList.vue";
  import { useNotes } from "../composables/useNotes";

  defineOptions({ name: "HomePage" });

  const { t } = useI18n();
  const { notes, loading, fetchNotes, deleteNote } = useNotes();
  const deletingId = ref(null);

  onMounted(() => {
    fetchNotes();
  });

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
      await fetchNotes();
    } finally {
      deletingId.value = null;
    }
  }
</script>
