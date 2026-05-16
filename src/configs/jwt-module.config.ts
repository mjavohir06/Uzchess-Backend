import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtModuleConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.SECRET_KEY,
  signOptions: {
    // @ts-ignore
    expiresIn: process.env.JWT_EXPIRE,
  },
};
