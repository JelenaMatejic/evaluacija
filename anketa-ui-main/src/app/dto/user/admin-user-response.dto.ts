
export class AdminUserResponseDto {
  id: string;
  email: string;
  name: string;
  role: string;
  numberOfProjects: number;


  constructor(id: string, email: string, name: string, role: string, numberOfProjects: number) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
    this.numberOfProjects = numberOfProjects;
  }
}
