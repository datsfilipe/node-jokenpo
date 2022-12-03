import Fastify from 'fastify'
import { routes } from './routes'

const app = Fastify({
  logger: true
})

app.get('/', (request, response) => {
  response.send('API is online, baby!')
})

app.register((appReference, _, done) => {
  routes.forEach(route => {
    appReference.route(route)
  })

  done()
}, { prefix: '/v1' })

export { app }
