 import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'

// Node no proporciona import.meta.env de Vite; el resto del módulo se ejecuta intacto.
const source = (await readFile(new URL('./apiClient.js', import.meta.url), 'utf8'))
  .replace('import.meta.env.VITE_API_URL', 'undefined')

async function client(t, fetchImplementation, cookie = '') {
  t.mock.method(globalThis, 'fetch', fetchImplementation)
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { cookie } })
  t.after(() => { delete globalThis.document })
  return import('data:text/javascript;base64,' + Buffer.from(source).toString('base64') + '#' + encodeURIComponent(t.name))
}

test('GET públicos incluyen credentials y no necesitan token CSRF', async (t) => {
  const { api } = await client(t, async (_, options) => {
    assert.equal(options.credentials, 'include')
    assert.equal(options.headers.has('X-XSRF-TOKEN'), false)
    return new Response('[]')
  })
  await Promise.all([api.getEvents(), api.getBusinesses(), api.getPointsOfInterest(), api.getRoutes()])
  assert.equal(fetch.mock.callCount(), 4)
})

test('login inicializa CSRF; CRUD y logout usan la cookie renovada', async (t) => {
  const calls = []
  const { api, login, logout } = await client(t, async (url, options) => {
    calls.push(url)
    assert.equal(options.credentials, 'include')
    if (url === '/api/admin/auth') {
      document.cookie = 'XSRF-TOKEN=before-login'
      return new Response('{"authenticated":false}')
    }
    if (url === '/api/admin/login') {
      assert.equal(options.headers.get('X-XSRF-TOKEN'), 'before-login')
      assert.equal(options.body.get('username'), 'test-admin')
      assert.equal(options.body.get('password'), 'test-password')
      document.cookie = 'XSRF-TOKEN=after-login'
    } else {
      assert.equal(options.headers.get('X-XSRF-TOKEN'), 'after-login')
      if (options.method !== 'DELETE' && url !== '/api/admin/logout') {
        assert.equal(options.headers.get('Content-Type'), 'application/json')
        assert.deepEqual(JSON.parse(options.body), { name: 'test' })
      }
      if (url === '/api/admin/logout') document.cookie = ''
    }
    return new Response('')
  })
  await login('test-admin', 'test-password')
  for (const entity of ['Event', 'Business', 'PointOfInterest', 'Route']) {
    await api['create' + entity]({ name: 'test' })
    await api['update' + entity](1, { name: 'test' })
    await api['delete' + entity](1)
  }
  await logout()
  await login('test-admin', 'test-password')
  assert.equal(calls.filter((url) => url === '/api/admin/auth').length, 2)
})

test('escrituras simultáneas comparten la inicialización CSRF', async (t) => {
  let initializationCount = 0
  const { api } = await client(t, async (url, options) => {
    if (url === '/api/admin/auth') {
      initializationCount++
      await new Promise((resolve) => setImmediate(resolve))
      document.cookie = 'XSRF-TOKEN=shared'
      return new Response('{"authenticated":true}')
    }
    assert.equal(options.headers.get('X-XSRF-TOKEN'), 'shared')
    return new Response('')
  })
  await Promise.all([api.deleteEvent(1), api.deleteBusiness(1), api.deleteRoute(1)])
  assert.equal(initializationCount, 1)
})

test('sin cookie no se envía la escritura', async (t) => {
  const { api } = await client(t, async () => new Response('{"authenticated":false}'))
  await assert.rejects(api.deleteEvent(1), /token CSRF/)
  assert.equal(fetch.mock.callCount(), 1)
})

test('401 y 403 se propagan sin reintentar escrituras', async (t) => {
  let status = 401
  const { login, api } = await client(t, async () => new Response('', { status }), 'XSRF-TOKEN=present')
  await assert.rejects(login('test-admin', 'wrong'), { status: 401 })
  status = 403
  await assert.rejects(api.deleteEvent(1), { status: 403 })
  assert.equal(fetch.mock.callCount(), 2)
})
