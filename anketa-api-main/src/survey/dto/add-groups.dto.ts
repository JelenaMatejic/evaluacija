import { IsArray } from "class-validator";
import { SimpleGroupDto } from "../../group/dto/simple-group.dto";

export class AddGroupsDto {
  @IsArray()
  groups: SimpleGroupDto[];
}
