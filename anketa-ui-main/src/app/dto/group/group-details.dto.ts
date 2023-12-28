import {SimpleUserDto} from "../user/simple-user.dto";

export class GroupDetailsDto {
  id: string;
  name: string;
  numberOfUsers: number;
  users: SimpleUserDto[];
  toAdd: any;


  constructor(id: string, name: string, numberOfUsers: number, users: SimpleUserDto[], toAdd: any) {
    this.id = id;
    this.name = name;
    this.numberOfUsers = numberOfUsers;
    this.users = users;
    this.toAdd = toAdd;
  }
}
