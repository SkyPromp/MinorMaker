import { Injectable } from '@angular/core';
import { RoleEnum } from '../model/role.enum';
import { IUser } from '../model/user.interface';

export interface Admin {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  users: IUser[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private admin: Admin = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'admin',
    password: 'admin123',
    users: [
      { id: 1, firstName: 'Alice', lastName: 'Smith', role: RoleEnum.CLIENT },
      { id: 2, firstName: 'Bob', lastName: 'Johnson', role: RoleEnum.CLIENT },
      { id: 3, firstName: 'Charlie', lastName: 'Brown', role: RoleEnum.CLIENT }
    ]
  };

  constructor() {

   }

   /** Returns dummy admin info */
  getAdmin(): Admin {
    return this.admin;
  }

  /** Returns all users under this admin */
  getUsers(): IUser[] {
    return this.admin.users;
  }

  /** Example: verify login credentials */
  login(username: string, password: string): boolean {
    return username === this.admin.username && password === this.admin.password;
  }
}
