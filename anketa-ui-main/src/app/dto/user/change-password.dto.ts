export class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string

  constructor(currentPassword: string, newPassword: string, repeatPassword: string) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.repeatPassword = repeatPassword;
  }
}
