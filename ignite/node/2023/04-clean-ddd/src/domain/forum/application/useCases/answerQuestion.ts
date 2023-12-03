import { UniqueEntityID } from '@/core/entities/uniqueEntityId'

import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answersRepository'

interface AnswerUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerUseCaseResponse {
  answer: Answer
}

export class AnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
