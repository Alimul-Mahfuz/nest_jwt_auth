// import {
//     CanActivate,
//     ExecutionContext,
//     Injectable,
//     UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';


// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private jwtService: JwtService) { }

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const authorization=request.headers.authorization
//         const token = authorization?.split(' ')[1];
//         if (!token) {
//             throw new UnauthorizedException();
//         }
//         try {
//             const tokenPayload=await this.jwtService.verifyAsync(token)
//             request.user = {
//                 userId: tokenPayload.sub,
//                 email: tokenPayload.email
//             }
//             console.log(request.user)
//             return true;
//         } catch(error) {
//             console.log(error)
//             throw new UnauthorizedException();
//         }

//     }

// }

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException();
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });
  
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  