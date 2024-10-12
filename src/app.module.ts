import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [DatabaseModule,ConfigModule.forRoot({isGlobal:true}), UsersModule, AuthModule, PostsModule],
  controllers: [],
  providers: [UsersModule],
})
export class AppModule {}
