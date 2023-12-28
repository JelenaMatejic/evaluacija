import { IsArray, IsString } from "class-validator";

export class AddUsersDto {
  @IsArray()
  users: string[];
}
