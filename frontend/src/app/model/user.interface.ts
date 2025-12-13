import {RoleEnum} from "./role.enum";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  imageUrl: string | null;
}
