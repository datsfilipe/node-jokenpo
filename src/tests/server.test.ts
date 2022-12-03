import { afterAll, expect, test } from 'vitest'
import supertest from 'supertest'

import { app } from '../app'

afterAll(() => {
  app.close()
})

test('with HTTP injection', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  expect(response.statusCode).toBe(200)
  expect(response.payload).toBe('API is online, baby!')
})

test('with a running server', async () => {
  await app.ready()

  const response = await supertest(app.server)
    .get('/')
    .expect(200)

  expect(response.text).toBe('API is online, baby!')
})
