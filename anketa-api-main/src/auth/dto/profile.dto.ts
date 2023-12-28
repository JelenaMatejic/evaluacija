
import { RoleEnum } from "../role.enum";

export class ProfileDto {
  id: string;
  email: string;
  name: string;
  role: RoleEnum


  constructor(id: string, email: string, name: string, role: RoleEnum) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }
}