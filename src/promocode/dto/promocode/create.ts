import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class PromocodeCreateDto {
  @IsNotEmpty()
  @IsString()
  public code!: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 1,
  })
  public discount!: number;

  @IsDateString()
  @IsNotEmpty()
  public expiredAt!: string;
}
