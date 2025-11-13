import { Injectable } from '@angular/core';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Admin {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  users: User[];
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
      { id: 1, firstName: 'Alice', lastName: 'Smith'},
      { id: 2, firstName: 'Bob', lastName: 'Johnson' },
      { id: 3, firstName: 'Charlie', lastName: 'Brown'}
    ]
  };

  constructor() {

   }

   /** Returns dummy admin info */
  getAdmin(): Admin {
    return this.admin;
  }

  /** Returns all users under this admin */
  getUsers(): User[] {
    return this.admin.users;
  }

  /** Example: verify login credentials */
  login(username: string, password: string): boolean {
    return username === this.admin.username && password === this.admin.password;
  }
}
