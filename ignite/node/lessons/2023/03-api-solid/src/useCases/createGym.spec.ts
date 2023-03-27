import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './createGym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.0067195,
      longitude: -51.1480857,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
