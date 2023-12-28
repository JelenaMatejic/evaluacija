import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { RoleEnum } from "./role.enum";
import { Token } from "./token.entity";
import { v4 as uuid} from "uuid"

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  async createToken(user: User): Promise<Token> {
    const token = uuid();
    var expire = new Date();
    expire.setDate(expire.getDate() + 1);

    const tokenEntity = this.create({
      token,
      user,
      expire
    });

    try {
      await this.save(tokenEntity);
    } catch (error) {
      // duplicate username
      if (error.code === '23505') {
        throw new ConflictException("Token not unique");
      } else {
        throw new InternalServerErrorException();
      }
    }

    return tokenEntity;
  }
}