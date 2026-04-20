export default {
  app: {
    title: 'Anotacoes',
  },
  noteForm: {
    sectionTitle: 'Nova anotacao',
    titleLabel: 'Titulo',
    titlePlaceholder: 'De um nome a anotacao',
    contentLabel: 'Conteudo',
    contentPlaceholder: 'Escreva algo...',
    submit: 'Salvar',
    submitting: 'Salvando...'
  },
  noteList: {
    countOne: '{count} anotacao',
    countOther: '{count} anotacoes',
    empty: 'Nenhuma anotacao ainda.'
  },
  errors: {
    saveNote: 'Erro ao salvar anotacao',
    fetchNotes: 'Erro ao buscar anotacoes: {status}',
    createNote: 'Erro ao criar anotacao',
    updateNote: 'Erro ao atualizar anotacao',
    deleteNote: 'Erro ao excluir anotacao',
    requestTimeout: 'A requisicao demorou demais. Tente novamente.'
  }
}
