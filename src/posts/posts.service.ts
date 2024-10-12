import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { PostRepository } from './repository/postRepositoryImpl';

@Injectable()
export class PostsService {

  constructor(
    private readonly postRepository: PostRepository,
    private readonly postEntityManager: EntityManager,
    private readonly userService: UsersService
  ) { }

  async create(createPostDto: CreatePostDto, userId: number) {
    if (createPostDto.user !== userId) {
      return "Unauthorized user id"
    }
    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new NotFoundException("user not found")
    }

    const post = new Post({ ...createPostDto, user })
    const newPostId = await this.postEntityManager.save(post)
    if (!newPostId) {
      throw new HttpException("Something went worng", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Post created successfully',
      data: newPostId,
    };

  }

  async findAll(userId:number) {
    return this.postRepository.findPostByUser(userId)
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
