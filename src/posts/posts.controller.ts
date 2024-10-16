import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guards/authGuard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto,@Req() request:Request) {
    const userId= request['user'].sub
    return this.postsService.create(createPostDto,userId);
  }

  @Get()
  async findAll(@Req() request:Request) {
    const userId=request['user'].sub;
    return await this.postsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
