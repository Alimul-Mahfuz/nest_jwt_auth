import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedToken } from './entity/blacklistToken';
import { TockenBlackListingService } from './tokenblacklisting.service';


@Module({
  exports:[TockenBlackListingService],
  imports:[
    TypeOrmModule.forFeature([BlacklistedToken]),
    UsersModule,
    JwtModule.registerAsync({
      global:true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,TockenBlackListingService]
})
export class AuthModule {}
