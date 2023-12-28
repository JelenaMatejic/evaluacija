import {SimpleGroupDto} from "../group/simple-group.dto";

export class AddGroupsDto {
  groups: SimpleGroupDto[];


  constructor(groups: SimpleGroupDto[]) {
    this.groups = groups;
  }
}
