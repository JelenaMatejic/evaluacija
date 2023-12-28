import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { ProfileDto } from "./dto/profile.dto";
import { User } from "./user.entity";
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { ChangeProfilePasswordDto } from "./dto/change-profile-password.dto";
import { AdminUserResponseDto } from "./dto/admin-user-response.dto";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
    ) {
  }

  async getProfile(user: User): Promise<ProfileDto> {
    return this.mapUserToProfileDto(user);
  }

  async getAllUsers(): Promise<AdminUserResponseDto[]> {
    let users = await this.userRepository.find();
    let res: AdminUserResponseDto[] = [];
    users.forEach(user => {
      res.push(this.mapToAdminResponse(user));
    })
    return res;
  }

  async getUserById(id: string): Promise<AdminUserResponseDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.mapToAdminResponse(user);
  }

  async updateProfile(user: User, profileDto: ProfileUpdateDto): Promise<void> {
    user.name = profileDto.name;
    user.email = profileDto.email;

    await this.userRepository.save(user);
  }

  async changePassword(user: User, dto: ChangeProfilePasswordDto): Promise<void> {
    const {currentPassword, newPassword, repeatPassword} = dto;
    // validation
    if (!await bcrypt.compare(currentPassword, user.password)) {
      throw new BadRequestException("Trenutna lozinka nije ispravna")
    }
    if (newPassword !== repeatPassword) {
      throw new BadRequestException("Nova i ponovljena lozinka moraju da budu iste")
    }

    await this.userRepository.updatePassword(user, newPassword);
  }

  private mapUserToProfileDto(user: User): ProfileDto {
    return new ProfileDto(
      user.id,
      user.email,
      user.name,
      user.role
    );
  }

  private mapToAdminResponse(user: User): AdminUserResponseDto {
    return new AdminUserResponseDto(
      user.id,
      user.email,
      user.name,
      user.role
    );
  }
}
