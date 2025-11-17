import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://task-master-frontend-seven.vercel.app/',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('TaskMaster API')
    .setDescription('API para gerenciamento de tarefas')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('auth')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(process.env.PORT || port);

  // console.log(`Backend rodando em http://locahost:${port}`);
  console.log(`Backend rodando na porta ${process.env.PORT || port}`);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Swagger disponível em http://localhost:${process.env.PORT || port}/api`);
  }

  // console.log(`Swagger disponível em http://localhost:${port}/api`);
}

bootstrap();
