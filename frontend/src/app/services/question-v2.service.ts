import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../model/response.interface";
import {IQuestion} from "../model/question.interface";

@Injectable({
  providedIn: 'root'
})
export class QuestionV2Service {
  BASE_URL :string = "http://localhost:5000/api/questions";

  constructor(private http: HttpClient) { }

  getAll() :Observable<IResponse<IQuestion[]>> {
    return this.http.get<IResponse<IQuestion[]>>(this.BASE_URL);
  }

}
