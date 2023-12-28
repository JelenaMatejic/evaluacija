export class ProfileDto {
  id: string;
  email: string;
  name: string;
  role: string


  constructor(id: string, email: string, name: string, role: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }
}
