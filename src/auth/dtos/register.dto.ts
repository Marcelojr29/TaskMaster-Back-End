import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDTO {
    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'johndoe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Pass123@' })
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
        message: 'The passoword must contain at least one lowercase letter, one uppercase letter and one number'
    })
    password: string;

    @ApiProperty({ example: 'Pass123@' })
    @IsNotEmpty()
    passwordConfirmation: string;
}
