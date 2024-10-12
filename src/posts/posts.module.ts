import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { PostRepository } from './repository/postRepositoryImpl';

@Module({
  imports:[TypeOrmModule.forFeature([Post]),UsersModule],
  controllers: [PostsController],
  providers: [PostsService,PostRepository],
})
export class PostsModule {}
