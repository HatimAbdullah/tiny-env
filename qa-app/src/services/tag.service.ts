import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { logger } from '@/utils/logger';
import { Tag } from '@/models/qa/tag.model';
import { CreateTagDto, GetAllTagsDto, UpdatedTagDto } from '@/dtos/tag.dto';

class TagService {

  public async findAll(queryData: GetAllTagsDto): Promise<Tag[]> {
    try {
        const tags: Tag[] = await Tag.createQueryBuilder("tags")
        .leftJoinAndSelect("tags.questions", "questions")
        .skip(queryData.skip)
        .take(queryData.take)
        .getMany();

        if (!tags) throw new HttpException(404, `no comments were found`);
        return tags;
    } catch(e) {
        logger.error(`error happened while fetching tags: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
    
  }

  public async findOne(tagId: number): Promise<Tag> {
    const tag: Tag = await Tag.findOne({id: tagId}, {relations: ["questions"]});
    if (!tag) throw new HttpException(404, `tag does not exist`);
    return tag;
  }

  public async create(tagData: CreateTagDto): Promise<Tag> {
    if (isEmpty(tagData)) throw new HttpException(400, "BAD REQUEST");

    const findTag: Tag = await Tag.findOne({body: tagData.body});
    if (findTag) throw new HttpException(409, `Tag ${tagData.body} already exists`);

    try {
        const tag: Tag = await Tag.create({body: tagData.body}).save();
        return tag;
    } catch(e) {
        logger.error(`error happened while creating tag: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  public async update(tagId: number, tagData: UpdatedTagDto): Promise<Tag> {
    if (isEmpty(tagData)) throw new HttpException(400, "BAD REQUEST");

    const findTag: Tag = await Tag.findOne({id: tagId});
    if (!findTag) throw new HttpException(404, "tag does not exist");

    try {
        const tag: Tag = await Tag.merge(findTag, {body: tagData.body}).save();
        return tag;
    } catch(e) {
        logger.error(`error happened while updating tag: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

  public async remove(commentId: number): Promise<Tag> {
    const findTag: Tag = await Tag.findOne({id: commentId});
    if (!findTag) throw new HttpException(404, "tag does not exist");

    try {
        return await findTag.remove();;
    } catch(e) {
        logger.error(`error happened while removing tag: ${e}`);
        throw new HttpException(500, `SERVER ERROR`);
    }
  }

}

export default TagService;
