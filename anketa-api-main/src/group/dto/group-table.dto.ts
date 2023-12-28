export class GroupTableDto {
  id: string;
  name: string;
  numberOfUsers: number;

  constructor(id: string, name: string, numberOfUsers: number) {
    this.id = id;
    this.name = name;
    this.numberOfUsers = numberOfUsers;
  }
}