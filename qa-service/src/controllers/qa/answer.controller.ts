import { Controller, Body, Post, UseBefore, HttpCode, Get, Param, Put, Delete } from 'routing-controllers';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import AnswerService from '../../services/answer.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { Answer } from '../../models/qa/answer.model';
import { CreateAnswerDto, UpdatedAnswerDto } from '../../dtos/answer.dto';

@Controller()
export class AnswersController {
  public answerService = new AnswerService();

  @Get('/questions/:qid/answers')
  @OpenAPI({ summary: 'Return a list of answers' })
  @HttpCode(200)
  async getAll(@Param('qid') questionId: number) {
    const answers: Answer[] = await this.answerService.findAll(questionId);
    return { data: answers, message: 'fetchAllAnswers' };
  }

  @Get('/questions/:qid/answers/:aid')
  @OpenAPI({ summary: 'Return an answer' })
  @HttpCode(200)
  async getOne(@Param('aid') answerId: number) {
    const answer: Answer = await this.answerService.findOne(answerId);
    return { data: answer, message: 'fetchAnswer' };
  }

  @Post('/questions/:qid/answers')
  @UseBefore(validationMiddleware(CreateAnswerDto, 'body'))
  @HttpCode(201)
  async create(@Param('qid') questionId: number, @Body() answerData: CreateAnswerDto) {
    const answer: Answer = await this.answerService.create(questionId, answerData);
    return { data: answer, message: 'createAnswer' };
  }

  @Put('/questions/:qid/answers/:aid')
  @UseBefore(validationMiddleware(UpdatedAnswerDto, 'body'))
  @HttpCode(200)
  async update(@Param('aid') answerId: number, @Body() answerData: UpdatedAnswerDto) {
    const answer: Answer = await this.answerService.update(answerId, answerData);
    return { data: answer, message: 'updateAnswer' };
  }

  @Delete('/questions/:qid/answers/:aid')
  @HttpCode(204)
  async delete(@Param('aid') answerId: number) {
    const answer: Answer = await this.answerService.remove(answerId);
    return { data: answer, message: 'removeAnswer' };
  }

}
