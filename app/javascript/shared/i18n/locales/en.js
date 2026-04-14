export default {
  app: {
    title: 'Notes',
    subtitle: 'Your ideas, in one place.',
    localeLabel: 'Language',
    locale: {
      'pt-BR': 'Portuguese (Brazil)',
      en: 'English'
    }
  },
  noteForm: {
    sectionTitle: 'New note',
    titleLabel: 'Title',
    titlePlaceholder: 'Give your note a title',
    contentLabel: 'Content',
    contentPlaceholder: 'Write something...',
    submit: 'Save'
  },
  noteList: {
    countOne: '{count} note',
    countOther: '{count} notes',
    empty: 'No notes yet.'
  },
  errors: {
    saveNote: 'Failed to save note',
    fetchNotes: 'Failed to fetch notes: {status}',
    createNote: 'Failed to create note',
    updateNote: 'Failed to update note',
    deleteNote: 'Failed to delete note'
  }
}
