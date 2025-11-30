import {RoleEnum} from "./role.enum";

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  role: RoleEnum;
}
