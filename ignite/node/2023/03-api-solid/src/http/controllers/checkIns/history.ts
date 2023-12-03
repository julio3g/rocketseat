import { makeFetchUserCheckInsHistoryUseCase } from '@/useCases/factories/makeFetchUserCheckInsHistoryUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, replay: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryQueryUseCase =
    makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await fetchUserCheckInsHistoryQueryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return replay.status(200).send({
    checkIns,
  })
}
