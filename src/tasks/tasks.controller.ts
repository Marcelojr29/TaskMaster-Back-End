import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { Task } from './schemas/tasks.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    async findAll(
        @Query('completed') completed: string, 
        @Request() req
    ): Promise<Task[]> {
        const userId = req.user._id;
        if (completed !== undefined) {
            return this.tasksService.findByStatus(userId, completed === 'true');
        }
        return this.tasksService.findAll(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get task by ID' })
    async findOne(
        @Param('id') id: string, 
        @Request() req,
    ): Promise<Task> {
        const userId = req.user._id;
        return this.tasksService.findOne(id, userId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    async create(
        @Body() createTaskDto: CreateTaskDTO, 
        @Request() req,
    ): Promise<Task> {
        const userId = req.user._id;
        return this.tasksService.create(createTaskDto, userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update task' })
    async update(
        @Param('id') id: string, 
        @Body() updateTaskDto: UpdateTaskDTO, 
        @Request() req,
    ): Promise<Task> {
        const userId = req.user._id;
        return this.tasksService.update(id, updateTaskDto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Task' })
    async delete(
        @Param('id') id: string, 
        @Request() req,
    ): Promise<Task> {
        const userId = req.user._id;
        return this.tasksService.delete(id, userId);
    }
}
