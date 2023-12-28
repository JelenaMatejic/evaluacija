import { SimpleUserDto } from "../../auth/dto/simple-user.dto";
import { ToaddSubentity } from "../toadd.subentity";

export class GroupDetailsDto {
  id: string;
  name: string;
  numberOfUsers: number;
  users: SimpleUserDto[];
  toAdd: ToaddSubentity;

  constructor(id: string, name: string, numberOfUsers: number, users: SimpleUserDto[], toAdd: ToaddSubentity) {
    this.id = id;
    this.name = name;
    this.numberOfUsers = numberOfUsers;
    this.users = users;
    this.toAdd = toAdd;
  }
}
