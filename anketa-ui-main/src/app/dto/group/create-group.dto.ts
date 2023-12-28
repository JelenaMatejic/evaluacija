export class CreateGroupDto {
  name: string;
  users: string[];

  constructor(name: string, users: string[]) {
    this.name = name;
    this.users = users;
  }
}
