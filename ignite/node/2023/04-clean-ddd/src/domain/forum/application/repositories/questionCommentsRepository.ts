import { QuestionComment } from '../../enterprise/entities/questionComment'

export interface QuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>
}
