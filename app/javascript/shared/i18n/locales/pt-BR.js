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
    contentCounter: '{count}/{max} caracteres',
    submit: 'Salvar',
    submitting: 'Salvando...',
    errors: {
      titleRequired: 'Título não pode ficar em branco',
      titleTooLong: 'Título deve ter no máximo {count} caracteres',
      contentTooLong: 'Conteúdo deve ter no máximo {count} caracteres',
      contentLimitReached: 'Limite de {count} caracteres atingido'
    }
  },
  noteList: {
    countOne: '{count} anotação',
    countOther: '{count} anotações',
    empty: 'Nenhuma anotação ainda.',
    loadingMore: 'Carregando mais anotações...',
    endOfList: 'Você chegou ao fim da lista.',
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
