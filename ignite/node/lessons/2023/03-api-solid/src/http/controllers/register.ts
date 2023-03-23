import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { userAlreadyExistsError } from '@/useCases/errors/userAlreadyExistsError'
import { RegisterUseCase } from '@/useCases/register'
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
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof userAlreadyExistsError) {
      return replay.status(409).send({ message: err.message })
    }
    throw err
    // replay.status(500).send() // TODO: fix me
  }

  return replay.status(201).send()
}
