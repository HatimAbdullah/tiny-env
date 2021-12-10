import { Response } from 'express';
import { Controller, Req, Body, Post, UseBefore, HttpCode, Res, Get, Param, Put, Delete } from 'routing-controllers';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import QuestionService from '../../services/question.service';
import { CreateQuestionDto, UpdatedQuestionDto, GetAllQuestionDto } from '../../dtos/question.dto';
import { Question } from '../../models/qa/question.model';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class QuestionsController {
  public questionService = new QuestionService();

  @Get('/questions')
  @UseBefore(validationMiddleware(GetAllQuestionDto, 'body'))
  @OpenAPI({ summary: 'Return a list of questions' })
  @HttpCode(200)
  async getAll(@Body() queryData: GetAllQuestionDto) {
    const questions: Question[] = await this.questionService.findAll(queryData);
    return { data: questions, message: 'fetchAllQuestions' };
  }

  @Get('/questions/:id')
  @OpenAPI({ summary: 'Return a list of questions' })
  @HttpCode(200)
  async getOne(@Param('id') questionId: number) {
    const question: Question = await this.questionService.findOne(questionId);
    return { data: question, message: 'fetchQuestion' };
  }

  @Post('/questions')
  @UseBefore(validationMiddleware(CreateQuestionDto, 'body'))
  @HttpCode(201)
  async create(@Body() questionData: CreateQuestionDto) {
    const question: Question = await this.questionService.create(questionData);
    return { data: question, message: 'createQuestion' };
  }

  @Put('/questions/:id')
  @UseBefore(validationMiddleware(UpdatedQuestionDto, 'body'))
  @HttpCode(200)
  async update(@Param('id') questionId: number, @Body() questionData: UpdatedQuestionDto) {
    const question: Question = await this.questionService.update(questionId, questionData);
    return { data: question, message: 'updateQuestion' };
  }

  @Delete('/questions/:id')
  @HttpCode(204)
  async delete(@Param('id') questionId: number) {
    const question: Question = await this.questionService.remove(questionId);
    return { data: question, message: 'removeQuestion' };
  }

}
