import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { RegisterDto } from "./dto/register.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { MailService } from "../mail/mail.service";
import { TokenRepository } from "./token.repository";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { GroupRepository } from "../group/group.repository";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(TokenRepository) private tokenRepository: TokenRepository,
    @InjectRepository(GroupRepository) private groupRepository: GroupRepository,
    private jwtService: JwtService,
    private mailService: MailService) {
  }

  async signUp(registerDto: RegisterDto): Promise<void> {
     const user = await this.userRepository.createUser(registerDto)
      const groups = await this.groupRepository.find();
    for (let group of groups) {
      if (group.toAdd !== undefined && group.toAdd !== null) {
        if (group.toAdd.emails.includes(registerDto.email)) {
          group.users.push(user);
          group.toAdd.emails = group.toAdd.emails.filter(e => e !== registerDto.email);
        }
        await this.groupRepository.save(group);
      }
    }
     this.mailService.sendUserRegisterMail(user);
     return;
  }

  async signIn(credentialsDto: AuthCredentialsDto): Promise<LoginResponseDto> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {email};
      const accessToken = this.jwtService.sign(payload);
      user.lastLoginDate = new Date().toISOString();
      await this.userRepository.save(user);
      return new LoginResponseDto(
        accessToken,
        [user.role],
        user.name
      )
    } else {
      throw new UnauthorizedException("Podaci nisu ispravni");
    }
  }

  async generateForgotPassword(forgotPssswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPssswordDto;
    const user = await this.userRepository.findOne({email});
    if (user) {
      const token = await this.tokenRepository.createToken(user);
      this.mailService.sendForgotPasswordMail(user, token.token);
    }
  }

  async changePasswordFromResetToken(changePasswordDto: ChangePasswordDto): Promise<void> {
    const {token, newPassword} = changePasswordDto;
    const tokenEntity = await this.tokenRepository.findOne({token});
    if (tokenEntity) {
      if (tokenEntity.expire >= new Date()) {
        const user = tokenEntity.user;
        await this.userRepository.updatePassword(user, newPassword);
        await this.tokenRepository.remove(tokenEntity);
      } else {
        throw new BadRequestException("Token je istekao, zatražite ponovo reset lozinke");
      }
    } else {
      throw new NotFoundException("Token nije pronađen");
    }
  }
}
