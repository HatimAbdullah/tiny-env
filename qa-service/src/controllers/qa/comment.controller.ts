import { Controller, Req, Body, Post, UseBefore, HttpCode, Res, Get, Param, Put, Delete } from 'routing-controllers';
import { validationMiddleware } from '@middlewares/validation.middleware';
import CommentService from '@services/comment.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { logger } from '@/utils/logger';
import { HttpException } from '@/exceptions/HttpException';
import { Question } from '@/models/qa/question.model';
import { Comment } from '@/models/qa/comment.model';
import { CreateCommentDto, UpdatedCommentDto } from '@/dtos/comment.dto';
import { Answer } from '@/models/qa/answer.model';

@Controller()
export class CommentsController {
  public commentService = new CommentService();

  @Get('/questions/:qid/comments')
  @OpenAPI({ summary: 'Return a list of comments to question' })
  @HttpCode(200)
  async getAllToQuestion(@Param('qid') questionId: number) {
    const comments: Comment[] = await this.commentService.findAll(await this.getQuestionCommentableId(questionId));
    return { data: comments, message: 'fetchAllQuestionComments' };
  }

  @Get('/questions/:qid/comments/:cid')
  @OpenAPI({ summary: 'Return an single comment to question' })
  @HttpCode(200)
  async getOneToQuestion(@Param('cid') commentId: number) {
    const comment: Comment = await this.commentService.findOne(commentId);
    return { data: comment, message: 'fetchCommentToQuestion' };
  }

  @Post('/questions/:qid/comments')
  @UseBefore(validationMiddleware(CreateCommentDto, 'body'))
  @HttpCode(201)
  async createToQuestion(@Param('qid') questionId: number, @Body() commentData: CreateCommentDto) {
    const comment: Comment = await this.commentService.create(await this.getQuestionCommentableId(questionId), commentData);
    return { data: comment, message: 'createCommentToQuestion' };
  }

  @Put('/questions/:qid/comments/:cid')
  @UseBefore(validationMiddleware(UpdatedCommentDto, 'body'))
  @HttpCode(200)
  async updateToQuestion(@Param('cid') commentId: number, @Body() commentData: UpdatedCommentDto) {
    const comment: Comment = await this.commentService.update(commentId, commentData);
    return { data: comment, message: 'updateCommentToQuestion ' };
  }

  @Delete('/questions/:qid/comments/:cid')
  @HttpCode(204)
  async deleteToQuestion(@Param('cid') commentId: number) {
    const comment: Comment = await this.commentService.remove(commentId);
    return { data: comment, message: 'removeCommentToQuestion' };
  }

  private async getQuestionCommentableId(questionId: number): Promise<number> {
    try {
        return await (await Question.findOne({id: questionId})).commentable_id;
    } catch(e) {
        logger.error(`error happened while fetching question: ${e}`);
        throw new HttpException(400, `BAD REQUEST`);
    }
  }


  @Get('/questions/:qid/answers/:aid/comments')
  @OpenAPI({ summary: 'Return a list of comments to answer' })
  @HttpCode(200)
  async getAllToAnswer(@Param('aid') answerId: number) {
    const comments: Comment[] = await this.commentService.findAll(await this.getAnswerCommentableId(answerId));
    return { data: comments, message: 'fetchAllAnswerComments' };
  }

  @Get('/questions/:qid/answers/:aid/comments/:cid')
  @OpenAPI({ summary: 'Return an single comment to answer' })
  @HttpCode(200)
  async getOneToAnswer(@Param('cid') commentId: number) {
    const comment: Comment = await this.commentService.findOne(commentId);
    return { data: comment, message: 'fetchCommentToAnswer' };
  }

  @Post('/questions/:qid/answers/:aid/comments')
  @UseBefore(validationMiddleware(CreateCommentDto, 'body'))
  @HttpCode(201)
  async createToAnswer(@Param('aid') answerId: number, @Body() commentData: CreateCommentDto) {
    const comment: Comment = await this.commentService.create(await this.getAnswerCommentableId(answerId), commentData);
    return { data: comment, message: 'createCommentToQuestion' };
  }

  @Put('/questions/:qid/answers/:aid/comments/:cid')
  @UseBefore(validationMiddleware(UpdatedCommentDto, 'body'))
  @HttpCode(200)
  async updateToAnswer(@Param('cid') commentId: number, @Body() commentData: UpdatedCommentDto) {
    const comment: Comment = await this.commentService.update(commentId, commentData);
    return { data: comment, message: 'updateCommentToQuestion ' };
  }

  @Delete('/questions/:qid/answers/:aid/comments/:cid')
  @HttpCode(204)
  async deleteToAnswer(@Param('cid') commentId: number) {
    const comment: Comment = await this.commentService.remove(commentId);
    return { data: comment, message: 'removeCommentToQuestion' };
  }

  private async getAnswerCommentableId(answerId: number): Promise<number> {
    try {
        return await (await Answer.findOne({id: answerId})).commentable_id;
    } catch(e) {
        logger.error(`error happened while fetching answer: ${e}`);
        throw new HttpException(400, `BAD REQUEST`);
    }
  }

}
