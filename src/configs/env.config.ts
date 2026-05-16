import 'dotenv/config';
import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    SECRET_KEY: Joi.string().required().min(32),
    BASE_URL: Joi.string().required(),
    DB_URL: Joi.string().required(),
    DEFAULT_DB_URL: Joi.string().required(),
    TEST_DB_URL: Joi.string().required(),
    PORT: Joi.number().required(),
    JWT_EXPIRE: Joi.string().required(),
    OTP_EXPIRE: Joi.number().required(),
    OTP_RESEND: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    DEFAULT_SIZE: Joi.number().required(),
    DEFAULT_PAGE: Joi.number().required(),
    NODE_ENV:Joi.string().required(),
  }),
}

// import { Injectable } from '@nestjs/common';
//
// export const ENV_CONFIG = 'ENV_CONFIG';
//
// @Injectable()
// export class EnvConfig {
//   constructor() {
//     this.validateAllVariables();
//     this.secretKey = process.env.SECRET_KEY as string;
//     this.baseUrl = process.env.BASE_URL as string;
//     this.port = Number(process.env.PORT);
//     this.jwtExpire = process.env.JWT_EXPIRE as string;
//     this.otpExpire = Number(process.env.OTP_EXPIRE);
//     this.otpResend = Number(process.env.OTP_RESEND);
//     this.dbUrl = process.env.DB_URL as string;
//     this.defaultDbUrl = process.env.DEFAULT_DB_URL as string;
//     this.testDbUrl = process.env.TEST_DB_URL as string;
//     this.defaultSize = Number(process.env.DEFAULT_SIZE);
//     this.defaultPage = Number(process.env.DEFAULT_PAGE);
//     this.postgresUser = process.env.POSTGRES_USER as string;
//     this.postgresPassword = process.env.POSTGRES_PASSWORD as string;
//     this.postgresDb = process.env.POSTGRES_DB as string;
//   }
//
//
//   secretKey!: string;
//
//   baseUrl!: string;
//   port!: number;
//
//   jwtExpire!: string;
//
//   otpExpire!: number;
//   otpResend!: number;
//
//   dbUrl!: string;
//   defaultDbUrl!: string;
//   testDbUrl!: string;
//
//   defaultSize!: number;
//   defaultPage!: number;
//
//   postgresUser!: string;
//   postgresPassword!: string;
//   postgresDb!: string;
//
//   private validateAllVariables() {
//     const requiredVariables = [
//       'SECRET_KEY', 'DB_URL', 'DEFAULT_DB_URL', 'TEST_DB_URL', 'PORT', 'JWT_EXPIRE', 'OTP_EXPIRE', 'OTP_RESEND',
//       'DEFAULT_SIZE', 'DEFAULT_PAGE', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB',
//     ];
//
//     const missingVariables = requiredVariables.filter((variable) => {
//       const value = process.env[variable];
//       return !value || value.trim() === '';
//     });
//
//     if (missingVariables.length > 0) {
//       console.error(`Missing or empty required environment variables: ${missingVariables.join(', ')}`);
//       process.exit(1);
//     }
//
//   }
// }