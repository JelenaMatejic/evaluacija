export class LoginResponseDto {
  token: string;
  roles: string[];
  name: string;


  constructor(token: string, roles: string[], name: string) {
    this.token = token;
    this.roles = roles;
    this.name = name;
  }
}