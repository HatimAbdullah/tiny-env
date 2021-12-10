import { IsInt, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  public body: string;
}

export class UpdatedAnswerDto {
  @IsString()
  public body: string;
}