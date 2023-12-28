import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RoleEnum } from "./role.enum";
import { User } from "./user.entity";
import { use } from "passport";

const RoleGuard = (role: RoleEnum): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const { user } = context.switchToHttp().getRequest();
      return user.role === role;
    }
  }

  return mixin(RoleGuardMixin);
}

export default RoleGuard;