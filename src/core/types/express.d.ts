import { Role } from "../enums/role.enum";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id:number,
        role:Role,
        login:string
      };
    }
  }
}