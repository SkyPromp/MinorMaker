import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../model/user.interface";
import { IResponse } from "../model/response.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  BASE_URL: string = "http://localhost:5000/api/users";

  constructor(private http: HttpClient) {}

  getAll(): Observable<IResponse<IUser[]>> {
    return this.http.get<IResponse<IUser[]>>(this.BASE_URL);
  }

  getAllClients(): Observable<IResponse<IUser[]>> {
    return this.http.get<IResponse<IUser[]>>(`${this.BASE_URL}/clients`);
  }

  addUser(
    firstname: string,
    lastname: string,
    role: number
  ): Observable<IResponse<IUser>> {
    const payload = {
      firstname: firstname,
      lastname: lastname,
      role: role,
    };
    return this.http.post<IResponse<IUser>>(this.BASE_URL, payload);
  }
}
