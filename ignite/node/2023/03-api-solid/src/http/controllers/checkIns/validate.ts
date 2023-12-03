import { makeValidateCheckInUseCase } from '@/useCases/factories/makeValidateCheckInUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, replay: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()
  await validateCheckInUseCase.execute({
    checkInId,
  })

  return replay.status(204).send()
}
