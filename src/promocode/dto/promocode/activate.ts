import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ActivateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public userId!: string;
}
