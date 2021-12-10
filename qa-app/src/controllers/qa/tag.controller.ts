import { Controller, Req, Body, Post, UseBefore, HttpCode, Res, Get, Param, Put, Delete } from 'routing-controllers';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { OpenAPI } from 'routing-controllers-openapi';
import TagService from '@/services/tag.service';
import { CreateTagDto, GetAllTagsDto, UpdatedTagDto } from '@/dtos/tag.dto';
import { Tag } from '@/models/qa/tag.model';

@Controller()
export class TagsController {
  public tagService = new TagService();

  @Get('/tags')
  @UseBefore(validationMiddleware(GetAllTagsDto, 'body'))
  @OpenAPI({ summary: 'Return a list of tags' })
  @HttpCode(200)
  async getAll(@Body() queryData: GetAllTagsDto) {
    const tags: Tag[] = await this.tagService.findAll(queryData);
    return { data: tags, message: 'fetchAllTags' };
  }

  @Get('/tags/:id')
  @OpenAPI({ summary: 'Return a tag' })
  @HttpCode(200)
  async getOne(@Param('id') tagId: number) {
    const tag: Tag = await this.tagService.findOne(tagId);
    return { data: tag, message: 'fetchTag' };
  }

  @Post('/tags')
  @UseBefore(validationMiddleware(CreateTagDto, 'body'))
  @HttpCode(201)
  async create(@Body() tagData: CreateTagDto) {
    const tag: Tag = await this.tagService.create(tagData);
    return { data: tag, message: 'createTag' };
  }

  @Put('/tags/:id')
  @UseBefore(validationMiddleware(UpdatedTagDto, 'body'))
  @HttpCode(200)
  async update(@Param('id') tagId: number, @Body() tagData: UpdatedTagDto) {
    const tag: Tag = await this.tagService.update(tagId, tagData);
    return { data: tag, message: 'updateTag' };
  }

  @Delete('/tags/:id')
  @HttpCode(204)
  async delete(@Param('id') tagId: number) {
    const tag: Tag = await this.tagService.remove(tagId);
    return { data: tag, message: 'removeQuestion' };
  }

}
