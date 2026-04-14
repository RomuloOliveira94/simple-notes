import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import NoteForm from '../../app/javascript/modules/notes/components/NoteForm.vue'
import { mountWithI18n } from './support/i18n'

global.fetch = vi.fn()

describe('NoteForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.head.innerHTML = '<meta name="csrf-token" content="test-token">'
  })

  it('renders form fields', () => {
    const wrapper = mount(NoteForm, {
      global: mountWithI18n()
    })
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Salvar')
  })

  it('emits note-created on successful submit', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true })
    const wrapper = mount(NoteForm, {
      global: mountWithI18n()
    })

    await wrapper.find('input').setValue('Test title')
    await wrapper.find('textarea').setValue('Test content')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.emitted('note-created')).toBeTruthy()
  })

  it('shows error on failed submit', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ errors: ['Title can\'t be blank'] })
    })
    const wrapper = mount(NoteForm, {
      global: mountWithI18n()
    })

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Title can\'t be blank')
  })
})
