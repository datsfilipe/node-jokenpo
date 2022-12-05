import { afterAll, expect, test, vi } from 'vitest'
import supertest from 'supertest'

import { app } from '../app'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

const request = supertest(app.server)

afterAll(() => {
  app.close()
})

const fakeToken = {
  access_token: 'fake-access-token',
  expires_in: 123,
  refresh_token: 'fake-refresh-token',
  refresh_token_expires_in: 123
}

const fakeUser = {
  id: 123,
  name: 'fake-name',
  login: 'fake-login'
}

vi.mock('../services/AuthenticateUserService', () => {
  return { AuthenticateUserService: class {
    async run (code: string) {
      return {
        token: fakeToken,
        user: fakeUser
      }
    }
  }}
})

vi.mock('../controllers/AuthenticateUserController', () => {
  return { AuthenticateUserController: class {
    async handle (request: FastifyRequest, response: FastifyReply) {
      const { code } = request.query as { code: string }

      const service = new AuthenticateUserService()
      const result = await service.run(code)

      return response.send(result)
    }
  }}
})

test('should be able to authenticate a user', async () => {
  await app.ready()

  await request.get('/v1/github').expect(302)

  const callbackResponse = await request.get('/v1/test/callback?code=123').expect(200)

  const { code } = callbackResponse.body
  
  expect(code).toBe('123')

  const response = await request.post('/v1/authenticate').send({ code }).expect(200)

  expect(response.body).toEqual({
    token: fakeToken,
    user: fakeUser
  })
})
