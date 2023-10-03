import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BG', {
    message: 'Invalid phone number. Valid phone number sample +359888123456'
  })
  phoneNumber: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  role: string;
}
