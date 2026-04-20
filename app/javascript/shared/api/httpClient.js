const DEFAULT_TIMEOUT_MS = 10000

function csrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]')
  return meta ? meta.content : ''
}

function createTimeoutSignal(timeoutMs) {
  if (!timeoutMs) {
    return { signal: undefined, cleanup: () => {} }
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => {
    controller.abort()
  }, timeoutMs)

  return {
    signal: controller.signal,
    cleanup: () => window.clearTimeout(timeoutId)
  }
}

export function createHttpClient({ baseUrl = '', timeout = DEFAULT_TIMEOUT_MS } = {}) {
  async function request(path, { method = 'GET', body, headers = {}, timeoutMs = timeout } = {}) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const url = `${baseUrl}${normalizedPath}`
    const isJsonBody = body !== undefined
    const token = csrfToken()
    const requestHeaders = {
      ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'X-CSRF-Token': token } : {}),
      ...headers
    }
    const { signal, cleanup } = createTimeoutSignal(timeoutMs)

    try {
      return await fetch(url, {
        method,
        headers: requestHeaders,
        body: isJsonBody ? JSON.stringify(body) : undefined,
        signal
      })
    } finally {
      cleanup()
    }
  }

  return {
    get(path, options = {}) {
      return request(path, { ...options, method: 'GET' })
    },
    post(path, body, options = {}) {
      return request(path, { ...options, method: 'POST', body })
    },
    patch(path, body, options = {}) {
      return request(path, { ...options, method: 'PATCH', body })
    },
    delete(path, options = {}) {
      return request(path, { ...options, method: 'DELETE' })
    }
  }
}
