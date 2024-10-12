import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/logindto';
import { AuthGuard } from './guards/authGuard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('register')
    register(@Body() createUserDto:CreateUserDto){
        return this.authService.register(createUserDto)
    }


    @UseGuards(AuthGuard)
    @Get('me')
    me(@Request() request) {
        return request.user

    }


    @UseGuards(AuthGuard)
    @Post('refresh')
    refresh(@Body() body:{access_token:string}){
        return this.authService.refresh({token:body.access_token})
    }
}
