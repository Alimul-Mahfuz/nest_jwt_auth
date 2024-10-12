import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/logindto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    
    constructor(
        private userService:UsersService,
        private readonly jwtService: JwtService,
    ){}

    async login(loginDto:LoginDto){
        const email = loginDto.email;
        const user = await this.userService.findUserByEmail(email)
        if(!user){
            throw NotFoundException
        }
        console.log(await comparePassword(loginDto.password,user.password))
        if(!await comparePassword(loginDto.password,user.password)){
            return "Invalid Password"
        }

        const payload={
            sub:user.id,
            email:user.email
        }
        

        const token=await this.jwtService.signAsync(payload)

        return {
            'access-token':token
        }

        
    }
}
