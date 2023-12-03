import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roletoVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, replay: FastifyReply) => {
    const { role } = request.user

    if (role !== roletoVerify) {
      return replay.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
