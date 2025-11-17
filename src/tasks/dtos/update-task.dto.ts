import { PartialType } from '@nestjs/swagger';
import { CreateTaskDTO } from './create-task.dto';

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
    completed?: boolean;
}
