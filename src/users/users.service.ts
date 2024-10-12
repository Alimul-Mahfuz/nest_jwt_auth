import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userEntityManager: EntityManager
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const password = await encodePassword(createUserDto.password)
      const user = new User(createUserDto)
      user.password = password
      this.userEntityManager.save(user)
      return "User saved to the database"
    } catch (error) {
      return error
    }
  }

  findAll() {
    return this.userRepository.find({
      select: ["id", "name", "email"]
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(usermail: string) {
    return await this.userRepository.findOneBy({ email: usermail })
  }
}
