import { UserAlreadyExistsError } from '@/useCases/errors/userAlreadyExistsError'
import { makeRegisterUseCase } from '@/useCases/factories/makeRegisterUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return replay.status(409).send({ message: err.message })
    }
    throw err
    // replay.status(500).send() // TODO: fix me
  }

  return replay.status(201).send()
}
