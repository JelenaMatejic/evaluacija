import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailModule } from "../mail/mail.module";
import { TokenRepository } from "./token.repository";
import { UserService } from "./user.service";
import { ProfileController } from "./profile.controller";
import { UserController } from "./user.controller";
import { GetUser } from "./get-user.decorator";
import { GroupRepository } from "../group/group.repository";

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: 3600
          }
        }),
      },
    ),
    MailModule,
    TypeOrmModule.forFeature([UserRepository, TokenRepository, GroupRepository]),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController, ProfileController, UserController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
