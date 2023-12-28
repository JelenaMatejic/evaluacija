import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../auth/user.entity";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserRegisterMail(user: User) {
    const url = `productcentral.io`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Product Central',
      template: 'accountRegister', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }

  async sendForgotPasswordMail(user: User, token: string) {
    const url = `evaluacija.xyz/reset-password?token=${token}` ;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Forgot password request',
      template: 'forgotPassword', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url,
        token,
      },
    });
  }
}
