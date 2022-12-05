import type { FastifyReply, FastifyRequest, HTTPMethods } from 'fastify'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'

type Routes = {
  method: HTTPMethods;
  url: string;
  // TODO: remove void from here when all routes are created
  handler: (request: FastifyRequest, response: FastifyReply) => Promise<unknown> | void;
  schema: Record<string, unknown>;
}[]

const routes: Routes = [
  {
    method: 'GET',
    url: '/wins/last3',
    handler: () => { return },
    schema: {}
  },
  {
    method: 'POST',
    url: '/authenticate',
    handler:  new AuthenticateUserController().handle,
    schema: {}
  },
  {
    method: 'GET',
    url: '/wins/ranking',
    handler: () => { return },
    schema: {}
  },
  {
    method: 'GET',
    url: '/github',
    handler: (request: FastifyRequest, response: FastifyReply) => {
      response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
    },
    schema: {}
  },
  {
    method: 'GET',
    url: '/test/callback',
    handler: (request: FastifyRequest, response: FastifyReply) => {
      const { code } = request.query as { code: string }

      return response.send({
        code: code
      })
    },
    schema: {}
  },
  {
    method: 'GET',
    url: '/profile',
    handler: () => { return },
    schema: {}
  }
]

export { routes }
