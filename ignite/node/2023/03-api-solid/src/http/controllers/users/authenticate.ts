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
    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await replay.jwtSign(
      {
        role: user.role,
      },
      { sign: { sub: user.id } },
    ) // não colocar dados sensíveis no payload => {}
    const refreshToken = await replay.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d', // expire in 7 days
        },
      },
    )

    return replay
      .setCookie('refreshToken', refreshToken, {
        path: '/', // todas as rotas poderao usar
        secure: true, // sera encriptado o refreshToken e o frontend veja criptografado
        sameSite: true, // mesmo site que vai acessar ele
        httpOnly: true, // o cookie so podera ser acessado pelo backend
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return replay.status(400).send({ message: err.message })
    }
    throw err
  }
}
