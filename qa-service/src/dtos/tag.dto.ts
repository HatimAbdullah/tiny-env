import { IsInt, IsPositive, IsString, Max, Min } from 'class-validator';

export class CreateTagDto {
  @IsString()
  public body: string;
}

export class UpdatedTagDto {
  @IsString()
  public body: string;
}

export class GetAllTagsDto {
    @IsInt()
    @IsPositive()
    public take: number;

    @IsInt()
    @Min(0)
    @Max(500)
    public skip: number;
  }