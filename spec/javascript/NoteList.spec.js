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
    expect(wrapper.text()).toContain('Nenhuma anotacao ainda')
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
    expect(wrapper.text()).toContain('2 anotacoes')
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
})
