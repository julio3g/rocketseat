import { verifyJWT } from '@/http/middlewares/verifyJwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/toke/refresh', refresh)
  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
