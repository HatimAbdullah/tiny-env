import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';
import { logger } from '../utils/logger';
import { Commentable } from '../models/qa/commentable.model';
import { Comment } from '../models/qa/comment.model';
import { CreateCommentDto, UpdatedCommentDto } from '../dtos/comment.dto';

class CommentService {

  public async findAll(commentableId: number): Promise<Comment[]> {
    try {
        const comments: Comment[] = await Comment.createQueryBuilder()
        .where({commentable_id: commentableId})
        .getMany();

        if (!comments) throw new HttpException(404, `no comments were found`);
        return comments;
    } catch(e) {
        logger.error(`error happened while fetching comments: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
    
  }

  public async findOne(commentId: number): Promise<Comment> {
    const comment: Comment = await Comment.findOne({id: commentId});
    if (!comment) throw new HttpException(404, `comment does not exist`);
    return comment;
  }

  public async create(commentableId: number, commentData: CreateCommentDto): Promise<Comment> {
    if (isEmpty(commentData)) throw new HttpException(400, "BAD REQUEST");

    const findCommentable: Commentable = await Commentable.findOne({id: commentableId});
    if (!findCommentable) throw new HttpException(400, "question does not exist");

    try {
        const comment: Comment = await Comment.create({body: commentData.body, commentable_id: findCommentable.id}).save();
        return comment;
    } catch(e) {
        logger.error(`error happened while creating comment: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  public async update(commentId: number, commentData: UpdatedCommentDto): Promise<Comment> {
    if (isEmpty(commentData)) throw new HttpException(400, "BAD REQUEST");

    const findComment: Comment = await Comment.findOne({id: commentId});
    if (!findComment) throw new HttpException(404, "comment does not exist");

    try {
        const comment: Comment = await Comment.merge(findComment, {body: commentData.body}).save();
        return comment;
    } catch(e) {
        logger.error(`error happened while updating comment: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  public async remove(commentId: number): Promise<Comment> {
    const findComment: Comment = await Comment.findOne({id: commentId});
    if (!findComment) throw new HttpException(404, "comment does not exist");

    try {
        return await findComment.remove();;
    } catch(e) {
        logger.error(`error happened while removing comment: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

}

export default CommentService;
