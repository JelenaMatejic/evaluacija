import { EntityRepository, Repository } from "typeorm";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { User } from "../auth/user.entity";
import { Group } from "./group.entity";
import { CreateGroupDto } from "./dto/create-group.dto";
import { ToaddSubentity } from "./toadd.subentity";

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  async createGroup(createDto: CreateGroupDto): Promise<Group> {
    const { name } = createDto;

    const group = this.create({
      name,
      toAdd: new ToaddSubentity()
    });

    try {
     return await this.save(group);
    } catch (error) {
        throw new InternalServerErrorException(error.message);
    }
  }

  // async updateProject(id: string, createDto: CreateProjectDto, user: User): Promise<void> {
  //   const { name, description, inProgress, startDate, endDate, repositoryFields, team, taskBoardLinks, documentLinks, customFields } = createDto;
  //
  //   const project = await this.findOne(id);
  //
  //   if (project) {
  //     if (project.owner.id != user.id) {
  //       throw new ConflictException("Can't edit project that is not yours");
  //     }
  //
  //     project.name = name;
  //     project.description = description;
  //     project.inProgress = inProgress;
  //     project.startDate = startDate;
  //     project.endDate = endDate;
  //     project.repositoryFields = repositoryFields;
  //     project.team = team;
  //     project.taskBoardLinks = taskBoardLinks;
  //     project.documentLinks = documentLinks;
  //     project.customFields = customFields;
  //
  //     try {
  //       await this.save(project);
  //     } catch (error) {
  //       throw new InternalServerErrorException(error.message);
  //     }
  //   } else {
  //     throw new NotFoundException("Project not found");
  //   }
  // }
}
