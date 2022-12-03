import type { HTTPMethods } from 'fastify'

type Routes = {
  method: HTTPMethods;
  url: string;
  handler: () => void;
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
    handler: () => { return },
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
    url: '/profile',
    handler: () => { return },
    schema: {}
  }
]

export { routes }
