import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NoteList from '../../app/javascript/modules/notes/components/NoteList.vue'
import { mountWithI18n } from './support/i18n'

describe('NoteList', () => {
  it('renders empty message when no notes', () => {
    const wrapper = mount(NoteList, {
      props: { notes: [] },
      global: mountWithI18n()
    })
    expect(wrapper.text()).toContain('Nenhuma anotação ainda')
  })

  it('renders notes list', () => {
    const notes = [
      { id: 1, title: 'Note 1', content: 'Content 1' },
      { id: 2, title: 'Note 2', content: 'Content 2' }
    ]
    const wrapper = mount(NoteList, {
      props: { notes },
      global: mountWithI18n()
    })
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.text()).toContain('Note 1')
    expect(wrapper.text()).toContain('Note 2')
    expect(wrapper.text()).toContain('2 anotações')
  })

  it('renders note without content', () => {
    const notes = [{ id: 1, title: 'Title only', content: null }]
    const wrapper = mount(NoteList, {
      props: { notes },
      global: mountWithI18n()
    })
    expect(wrapper.text()).toContain('Title only')
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('emits delete-note when delete button is clicked', async () => {
    const notes = [{ id: 1, title: 'Note 1', content: 'Content 1' }]
    const wrapper = mount(NoteList, {
      props: { notes },
      global: mountWithI18n()
    })

    await wrapper.find('button[aria-label="Excluir anotação"]').trigger('click')

    expect(wrapper.emitted('delete-note')).toBeTruthy()
    expect(wrapper.emitted('delete-note')[0]).toEqual([notes[0]])
  })

  it('disables delete button for note being deleted', () => {
    const notes = [{ id: 1, title: 'Note 1', content: 'Content 1' }]
    const wrapper = mount(NoteList, {
      props: { notes, deletingId: 1 },
      global: mountWithI18n()
    })

    expect(wrapper.find('button[aria-label="Excluir anotação"]').attributes('disabled')).toBeDefined()
  })
})
