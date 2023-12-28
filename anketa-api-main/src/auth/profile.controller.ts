import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";
import { ProfileDto } from "./dto/profile.dto";
import { UserService } from "./user.service";
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { ChangeProfilePasswordDto } from "./dto/change-profile-password.dto";
import RoleGuard from "./role.guard";
import { RoleEnum } from "./role.enum";

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {

  constructor(private userService: UserService) {
  }

  @Get()
  //@UseGuards(RoleGuard(RoleEnum.USER))
  getProfile(@GetUser() user: User): Promise<ProfileDto> {
    return this.userService.getProfile(user);
  }

  @Put()
  updateProfile(@GetUser() user: User, @Body() profileDto: ProfileUpdateDto): Promise<void> {
    return this.userService.updateProfile(user, profileDto);
  }

  @Put('/change-password')
  changePassword(@GetUser() user: User, @Body() dto: ChangeProfilePasswordDto): Promise<void> {
    return this.userService.changePassword(user, dto);
  }
}
