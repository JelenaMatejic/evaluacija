import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "./group.repository";
import { UserRepository } from "../auth/user.repository";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "./group.entity";
import { User } from "../auth/user.entity";
import { GroupTableDto } from "./dto/group-table.dto";
import { GroupDetailsDto } from "./dto/group-details.dto";
import { SimpleUserDto } from "../auth/dto/simple-user.dto";
import { AddUsersDto } from "./dto/add-users.dto";
import { SimpleGroupDto } from "./dto/simple-group.dto";
import { ToaddSubentity } from "./toadd.subentity";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository) private groupRepository: GroupRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async createGroup(creatDto: CreateGroupDto): Promise<Group> {
    const group = await this.groupRepository.createGroup(creatDto);
    const users: User[] = [];
    for (let email of creatDto.users) {
      const user = await this.userRepository.findOne({email});
      if (user) {
        users.push(user);
      } else {
        if (group.toAdd === undefined || group.toAdd === null) {
          group.toAdd = new ToaddSubentity();
        }
        group.toAdd.emails.push(email);
      }
    }
    group.users = users;
    return await this.groupRepository.save(group);
  }

  async addUsers(addUsersDto: AddUsersDto, id: string): Promise<void> {
    const group = await this.groupRepository.findOne(id);
    for (let email of addUsersDto.users) {
      const user = await this.userRepository.findOne({email});
      if (user) {
        group.users.push(user);
      } else {
        if (group.toAdd === undefined || group.toAdd === null) {
          group.toAdd = new ToaddSubentity();
        }
        group.toAdd.emails.push(email);
      }
    }
    await this.groupRepository.save(group);
  }

  async removeGroup(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }

  async removeUserFromGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.groupRepository.findOne({id: groupId});
    if (!group) {
      throw new NotFoundException("Grupa ne postoji");
    }

    group.users = group.users.filter(user => {
      return user.id !== userId;
    });
    await this.groupRepository.save(group);
  }

  async getAllGroups(): Promise<GroupTableDto[]> {
    const groups = await this.groupRepository.find();
    const res: GroupTableDto[] = [];
    for (let group of groups) {
      const dto = new GroupTableDto(group.id, group.name, group.users != undefined ? group.users.length : 0);
      res.push(dto);
    }

    return res;
  }

  async getAllGroupsSimple(): Promise<SimpleGroupDto[]> {
    const groups = await this.groupRepository.find();
    const res: SimpleGroupDto[] = [];
    for (let group of groups) {
      const dto = new SimpleGroupDto();
      dto.id = group.id;
      dto.name = group.name;
      res.push(dto);
    }

    return res;
  }

  async getGroup(id: string): Promise<GroupDetailsDto> {
    const group = await this.groupRepository.findOne(id);
    const users: SimpleUserDto[] = [];

    for (let user of group.users) {
      users.push(new SimpleUserDto(user.id, user.name, user.email));
    }

    return new GroupDetailsDto(
      group.id,
      group.name,
      group.users != undefined ? group.users.length : 0,
      users,
      group.toAdd
    );
  }
}
