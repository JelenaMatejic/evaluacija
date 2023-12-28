import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { GroupRepository } from "./group.repository";
import { GroupController } from './group.controller';
import { UserRepository } from "../auth/user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository, UserRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {

}
