import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/tasks.schema';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async findAll(userId: Types.ObjectId): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: Types.ObjectId): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, userId }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDTO, userId: Types.ObjectId): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      userId,
    });
    return createdTask.save();
  }

  async update(id: string, updateTaskDto: UpdateTaskDTO, userId: Types.ObjectId): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, userId }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  async delete(id: string, userId: Types.ObjectId): Promise<Task> {
    const task = await this.taskModel.findByIdAndDelete({ _id: id, userId }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async findByStatus(userId: Types.ObjectId, completed: boolean): Promise<Task[]> {
    return this.taskModel.find({ userId, completed }).exec();
  }
}
