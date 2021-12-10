import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Question } from '@/models/qa/question.model';
import { logger } from '@/utils/logger';
import { Commentable } from '@/models/qa/commentable.model';
import { Answer } from '@/models/qa/answer.model';
import { CreateAnswerDto, UpdatedAnswerDto } from '@/dtos/answer.dto';

class AnswerService {

  public async findAll(questionId: number): Promise<Answer[]> {
    try {
        const answers: Answer[] = await Answer.createQueryBuilder()
        .where({question_id: questionId})
        .getMany();

        if (!answers) throw new HttpException(404, `no answers were found`);
        return answers;
    } catch(e) {
        logger.error(`error happened while fetching answers: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
    
  }

  public async findOne(answerId: number): Promise<Answer> {
    const answer: Answer = await Answer.findOne({id: answerId});
    if (!answer) throw new HttpException(404, `answer does not exist`);
    return answer;
  }

  public async create(questionId: number, answerData: CreateAnswerDto): Promise<Answer> {
    if (isEmpty(answerData)) throw new HttpException(400, "BAD REQUEST");

    const findQuestion: Question = await Question.findOne({id: questionId});
    if (!findQuestion) throw new HttpException(400, "question does not exist");

    try {
        const answer: Answer = await Answer.create({body: answerData.body, question_id: findQuestion.id ,commentable_id: await (await Commentable.create().save()).id}).save();
        return answer;
    } catch(e) {
        logger.error(`error happened while creating answer: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  public async update(answerId: number, answerData: UpdatedAnswerDto): Promise<Answer> {
    if (isEmpty(answerData)) throw new HttpException(400, "BAD REQUEST");

    const findAnswer: Answer = await Answer.findOne({id: answerId});
    if (!findAnswer) throw new HttpException(404, "answer does not exist");

    try {
        const answer: Answer = await Answer.merge(findAnswer, {body: answerData.body}).save();
        return answer;
    } catch(e) {
        logger.error(`error happened while updating answer: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  public async remove(answerId: number): Promise<Answer> {
    const findAnswer: Answer = await Answer.findOne({id: answerId});
    if (!findAnswer) throw new HttpException(404, "answer does not exist");
    const findCommentable: Commentable = await Commentable.findOne({id: findAnswer.commentable_id});

    try {
        await findCommentable.remove();
        return await findAnswer.remove();
    } catch(e) {
        logger.error(`error happened while removing question: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

}

export default AnswerService;
