import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, replay: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user

  const token = await replay.jwtSign(
    { role },
    { sign: { sub: request.user.sub } },
  )

  // const authenticateUseCase = makeAuthenticateUseCase()
  //   const { user } = await authenticateUseCase.execute({ email, password })

  const refreshToken = await replay.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
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
}
