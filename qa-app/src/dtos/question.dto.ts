import { IsArray, IsInt, IsOptional, IsPositive, IsString, Max, Min, ValidateNested } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  public body: string;
}

export class UpdatedQuestionDto {
  @IsString()
  @IsOptional()
  public body: string;

  @IsOptional()
  public tags: number[]
}

export class GetAllQuestionDto {
    @IsInt()
    @IsPositive()
    public take: number;

    @IsInt()
    @Min(0)
    @Max(500)
    public skip: number;
  }