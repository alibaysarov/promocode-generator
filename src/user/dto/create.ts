import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @IsOptional()
  @IsString()
  public name?: string;
}
