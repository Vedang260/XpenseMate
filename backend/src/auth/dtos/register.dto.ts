import { IsNotEmpty, MinLength, MaxLength, IsStrongPassword, IsString, IsEmail  } from 'class-validator';

// register dto
export class RegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @MinLength(6)
    @MaxLength(15)
    password: string;
}