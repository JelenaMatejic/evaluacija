import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post("/signup")
  signUp(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.signUp(registerDto);
  }

  @Post("/signin")
  signIn(@Body() credentialsDto: AuthCredentialsDto): Promise<LoginResponseDto> {
    return this.authService.signIn(credentialsDto);
  }

  @Post("/forgot-password")
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.generateForgotPassword(forgotPasswordDto);
  }

  @Post("/reset-password")
  resetPassword(@Body() changePasswordDto: ChangePasswordDto): Promise<void> {
    return this.authService.changePasswordFromResetToken(changePasswordDto);
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
