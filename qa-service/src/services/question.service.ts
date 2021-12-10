import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { GetAllQuestionDto, CreateQuestionDto, UpdatedQuestionDto } from '@/dtos/question.dto';
import { Question } from '@/models/qa/question.model';
import { logger } from '@/utils/logger';
import { Commentable } from '@/models/qa/commentable.model';
import { Tag } from '@/models/qa/tag.model';

class QuestionService {

  public async findAll(query: GetAllQuestionDto): Promise<Question[]> {
    if (isEmpty(query)) throw new HttpException(400, "BAD REQUEST");

    try {
        const questions: Question[] = await Question.createQueryBuilder("questions")
        .leftJoinAndSelect("questions.answers", "answers")
        .leftJoinAndSelect("questions.tags", "tags")
        .take(query.take)
        .skip(query.skip)
        .getMany();

        if (!questions) throw new HttpException(404, `no questions were found`);
        return questions;
    } catch(e) {
        logger.error(`error happened while fetching questions: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
    
  }

  public async findOne(questionId: number): Promise<Question> {
    const question: Question = await Question.findOne({id: questionId}, {relations: ["answers", "tags"]});
    if (!question) throw new HttpException(404, `question does not exist`);
    return question;
  }

  public async create(questionData: CreateQuestionDto): Promise<Question> {
    if (isEmpty(questionData)) throw new HttpException(400, "BAD REQUEST");

    try {
        const question: Question = await Question.create({body: questionData.body, commentable_id: await (await Commentable.create().save()).id}).save();
        return question;
    } catch(e) {
        logger.error(`error happened while creating question: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  public async update(questionId: number, questionData: UpdatedQuestionDto): Promise<Question> {
    if (isEmpty(questionData)) throw new HttpException(400, "BAD REQUEST");

    const findQuestion: Question = await Question.findOne({id: questionId});
    if (!findQuestion) throw new HttpException(404, "question does not exist");

    try {
        await this.linkQuestionToTag(questionData.tags, findQuestion);
        const question: Question = await Question.merge(findQuestion, {body: questionData.body}).save();
        return question;
    } catch(e) {
        logger.error(`error happened while updating question: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  public async remove(questionId: number): Promise<Question> {
    const findQuestion: Question = await Question.findOne({id: questionId});
    if (!findQuestion) throw new HttpException(404, "question does not exist");
    const findCommentable: Commentable = await Commentable.findOne({id: findQuestion.commentable_id});

    try {
        await findCommentable.remove();
        return await findQuestion.remove();
    } catch(e) {
        logger.error(`error happened while removing question: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  private async linkQuestionToTag(tagIds: number[], question: Question): Promise<void> {
    let questionTags: Tag[] = [];
    for(const tagId of tagIds) {
        const findTag: Tag = await Tag.findOne({id: tagId});
        if (!findTag) throw new HttpException(404, "tag does not exist");
        questionTags.push(findTag)
    }
    question.tags = questionTags;
    question.save();
  }

}

export default QuestionService;
