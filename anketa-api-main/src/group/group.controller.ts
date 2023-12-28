import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  Post, Put,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import RoleGuard from "../auth/role.guard";
import { RoleEnum } from "../auth/role.enum";
import { Group } from "./group.entity";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { GroupTableDto } from "./dto/group-table.dto";
import { GroupDetailsDto } from "./dto/group-details.dto";
import { AddUsersDto } from "./dto/add-users.dto";
import { SimpleGroupDto } from "./dto/simple-group.dto";

@Controller('group')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class GroupController {

  constructor(private groupService: GroupService) {
  }

  @Post()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllUsers(@Body() createDto: CreateGroupDto): Promise<Group> {
    return this.groupService.createGroup(createDto);
  }

  @Put('/users/:id')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  addUsers(@Param('id') id: string, @Body() addDto: AddUsersDto): Promise<void> {
    return this.groupService.addUsers(addDto, id);
  }

  @Delete('/:id')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  removeGroup(@Param('id') id: string): Promise<void> {
    return this.groupService.removeGroup(id);
  }

  @Delete('/:id/users/:userId')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  removeUserFromGroup(@Param('id') id: string, @Param('userId') userId: string): Promise<void> {
    return this.groupService.removeUserFromGroup(id, userId);
  }

  @Get()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllGroups(): Promise<GroupTableDto[]> {
    return this.groupService.getAllGroups();
  }

  @Get('/simple/all')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllGroupsSimple(): Promise<SimpleGroupDto[]> {
    return this.groupService.getAllGroupsSimple();
  }

  @Get('/:id')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getgROUP(@Param('id') id: string): Promise<GroupDetailsDto> {
    return this.groupService.getGroup(id);
  }
}
