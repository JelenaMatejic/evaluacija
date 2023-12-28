import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupRepository } from "../group/group.repository";
import { UserRepository } from "../auth/user.repository";
import { PassportModule } from "@nestjs/passport";
import { SurveyRepository } from "./survey.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyRepository, GroupRepository, UserRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  controllers: [SurveyController],
  providers: [SurveyService]
})
export class SurveyModule {}
