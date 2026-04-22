import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import NoteForm from '../../app/javascript/modules/notes/components/NoteForm.vue'
import { mountWithI18n } from './support/i18n'
import { NOTE_CONTENT_MAX_LENGTH, NOTE_TITLE_MAX_LENGTH } from '../../app/javascript/modules/notes/constants/noteValidation'

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

    await wrapper.find('input').setValue('Valid title')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Title can\'t be blank')
  })

  it('validates required title on frontend before submitting', async () => {
    const wrapper = mount(NoteForm, {
      global: mountWithI18n()
    })

    await wrapper.find('textarea').setValue('Test content')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(global.fetch).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Título não pode ficar em branco')
  })

  it('renders max length attributes and content counter', async () => {
    const wrapper = mount(NoteForm, {
      global: mountWithI18n()
    })

    expect(wrapper.find('#title').attributes('maxlength')).toBe(String(NOTE_TITLE_MAX_LENGTH))
    expect(wrapper.find('#content').attributes('maxlength')).toBe(String(NOTE_CONTENT_MAX_LENGTH))
    expect(wrapper.find('#content').attributes('rows')).toBe('8')
    expect(wrapper.find('#content').classes()).toContain('resize-y')
    expect(wrapper.text()).toContain(`0/${NOTE_CONTENT_MAX_LENGTH} caracteres`)

    await wrapper.find('textarea').setValue('abc')
    expect(wrapper.text()).toContain(`3/${NOTE_CONTENT_MAX_LENGTH} caracteres`)
  })

  it('shows message when content character limit is reached', async () => {
    const wrapper = mount(NoteForm, {
      global: mountWithI18n()
    })

    await wrapper.find('textarea').setValue('a'.repeat(NOTE_CONTENT_MAX_LENGTH))
    expect(wrapper.text()).toContain(`Limite de ${NOTE_CONTENT_MAX_LENGTH} caracteres atingido`)
  })

  it('disables submit button while request is in progress', async () => {
    let resolveRequest
    const pendingRequest = new Promise((resolve) => {
      resolveRequest = resolve
    })

    global.fetch.mockReturnValueOnce(pendingRequest)
    const wrapper = mount(NoteForm, {
      global: mountWithI18n()
    })

    await wrapper.find('input').setValue('Test title')
    await wrapper.find('textarea').setValue('Test content')
    await wrapper.find('form').trigger('submit.prevent')

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
    expect(submitButton.text()).toBe('Salvando...')

    resolveRequest({ ok: true })
    await flushPromises()

    expect(submitButton.attributes('disabled')).toBeUndefined()
    expect(submitButton.text()).toBe('Salvar')
  })
})
