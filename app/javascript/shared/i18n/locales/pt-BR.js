export default {
  app: {
    title: 'Anotações',
  },
  noteForm: {
    sectionTitle: 'Nova anotação',
    titleLabel: 'Título',
    titlePlaceholder: 'Dê um nome à anotação',
    contentLabel: 'Conteúdo',
    contentPlaceholder: 'Escreva algo...',
    submit: 'Salvar',
    submitting: 'Salvando...'
  },
  noteList: {
    countOne: '{count} anotação',
    countOther: '{count} anotações',
    empty: 'Nenhuma anotação ainda.',
    deleteAriaLabel: 'Excluir anotação',
    deleteConfirm: 'Tem certeza que deseja excluir a anotação "{title}"?'
  },
  errors: {
    saveNote: 'Erro ao salvar anotação',
    fetchNotes: 'Erro ao buscar anotacoes: {status}',
    createNote: 'Erro ao criar anotação',
    updateNote: 'Erro ao atualizar anotação',
    deleteNote: 'Erro ao excluir anotação',
    requestTimeout: 'A requisicao demorou demais. Tente novamente.'
  }
}
