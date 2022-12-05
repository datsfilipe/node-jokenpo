import type { FastifyRequest, FastifyReply } from 'fastify'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

type RequestBody = {
  code: string;
}

class AuthenticateUserController {
  async handle (request: FastifyRequest, response: FastifyReply) {
    const { code } = request.body as RequestBody

    const service = new AuthenticateUserService()

    try {
      const result = await service.run(code)
      return response.send(result)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.send({
        error: err.message
      })
    }
  }
}

export { AuthenticateUserController }
