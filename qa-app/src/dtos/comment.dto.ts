import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  public body: string;
}

export class UpdatedCommentDto {
  @IsString()
  public body: string;
}