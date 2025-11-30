import {Injectable} from '@angular/core';
import {IUser} from "../model/user.interface";
import {RoleEnum} from "../model/role.enum";

@Injectable({
  providedIn: 'root'
})
export class CurrentSurveyService {

  private currentUser: IUser | null = null;
  // private currentUser: IUser = {
  //   id: -1,
  //   firstname: "John",
  //   lastname: "Doe",
  //   role: RoleEnum.CLIENT
  // }

  constructor() { }

  getCurrentUser(): IUser | null {
    return this.currentUser;
  }
  setCurrentUser(user: IUser): void {
    if (user.role == RoleEnum.CLIENT) {
      this.currentUser = user;
    }
  }

}
