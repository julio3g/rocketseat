import { InMemoryAnswersRepository } from 'test/repositories/InMemoryAnswersRepository'
import { AnswerUseCase } from './answerQuestion'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'content the question',
    })
    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
