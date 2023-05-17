import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answersRepository'
import { QuestionsRepository } from '../repositories/questionsRepository'

interface ChooseQuestionBestAnswerRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found.')

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) throw new Error('Question not found.')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed')

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return { question }
  }
}
