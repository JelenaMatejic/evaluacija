import { IsString } from "class-validator";

export class ChangeProfilePasswordDto {
  @IsString()
  currentPassword: string;
  @IsString()
  newPassword: string;
  @IsString()
  repeatPassword: string
}