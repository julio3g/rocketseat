import { InvalidCredentialsError } from '@/useCases/errors/invalidCredentialsError'
import { makeAuthenticateUseCase } from '@/useCases/factories/makeAuthenticateUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return replay.status(400).send({ message: err.message })
    }
    throw err
    // replay.status(500).send() // TODO: fix me
  }

  return replay.status(200).send()
}
