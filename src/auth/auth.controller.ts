import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/logindto';
import { AuthGuard } from './guards/authGuard';
import { request } from 'http';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }


    @UseGuards(AuthGuard)
    @Get('me')
    me(@Request() request) {
        return request.user

    }


    @UseGuards(AuthGuard)
    @Post('refresh')
    refresh(@Body() body:{access_token:string}){
        return this.authService.refresh(body.access_token)
    }
}
