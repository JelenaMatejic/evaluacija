import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";
import { ProfileDto } from "./dto/profile.dto";
import { UserService } from "./user.service";
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { ChangeProfilePasswordDto } from "./dto/change-profile-password.dto";
import RoleGuard from "./role.guard";
import { RoleEnum } from "./role.enum";
import { AdminUserResponseDto } from "./dto/admin-user-response.dto";

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllUsers(): Promise<AdminUserResponseDto[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getUser(@Param('id') id: string): Promise<AdminUserResponseDto> {
    return this.userService.getUserById(id);
  }
}
