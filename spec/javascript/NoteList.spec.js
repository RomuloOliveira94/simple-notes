import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NoteList from '../../app/javascript/vue/NoteList.vue'

describe('NoteList', () => {
  it('renders empty message when no notes', () => {
    const wrapper = mount(NoteList, {
      props: { notes: [] }
    })
    expect(wrapper.text()).toContain('Nenhuma anotação cadastrada')
  })

  it('renders notes list', () => {
    const notes = [
      { id: 1, title: 'Note 1', content: 'Content 1' },
      { id: 2, title: 'Note 2', content: 'Content 2' }
    ]
    const wrapper = mount(NoteList, {
      props: { notes }
    })
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.text()).toContain('Note 1')
    expect(wrapper.text()).toContain('Note 2')
  })

  it('renders note without content', () => {
    const notes = [{ id: 1, title: 'Title only', content: null }]
    const wrapper = mount(NoteList, {
      props: { notes }
    })
    expect(wrapper.text()).toContain('Title only')
    expect(wrapper.find('p').exists()).toBe(false)
  })
})
