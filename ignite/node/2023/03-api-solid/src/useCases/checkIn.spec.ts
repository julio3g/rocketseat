import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './checkIn'
import { MaxDistanceError } from './errors/maxDistanceError'
import { MaxNumberOfCheckInsError } from './errors/maxNumberOfCheckInsError'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -27.0067195,
      longitude: -51.1480857,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useFakeTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.0067195,
      userLongitude: -51.1480857,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.0067195,
      userLongitude: -51.1480857,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -27.0067195,
        userLongitude: -51.1480857,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.0067195,
      userLongitude: -51.1480857,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.0067195,
      userLongitude: -51.1480857,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-26.9989192),
      longitude: new Decimal(-51.0909225),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -27.0067195,
        userLongitude: -51.1480857,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
