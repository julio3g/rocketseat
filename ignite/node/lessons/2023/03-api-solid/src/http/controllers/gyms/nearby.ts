import { makeFetchNearbyGymsUseCase } from '@/useCases/factories/makeFetchNeabyGymsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, replay: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query)

  const fetchNearbyGymQueryUseCase = makeFetchNearbyGymsUseCase()
  await fetchNearbyGymQueryUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return replay.status(200).send()
}
