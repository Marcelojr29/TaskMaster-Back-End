import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
    @ApiProperty({ description: 'Title of task' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'Description of Task', required: false })
    @IsOptional()
    @IsString()
    description?: string;
}
