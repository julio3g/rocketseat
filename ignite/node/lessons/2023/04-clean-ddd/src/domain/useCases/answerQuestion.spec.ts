import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answersRepository'
import { AnswerQuestionUseCase } from './answerQuestion'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  },
}

test('create an answer', async () => {
  const AnswerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await AnswerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })
  expect(answer.content).toEqual('Nova resposta')
})
