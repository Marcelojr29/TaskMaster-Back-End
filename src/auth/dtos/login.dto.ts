import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
    @ApiProperty({ example: 'johndoe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Pass123@' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
