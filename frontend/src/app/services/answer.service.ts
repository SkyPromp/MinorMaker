import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAnswer} from "../model/answer.interface";
import {IResponse} from "../model/response.interface";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  BASE_URL :string = "http://localhost:5000/api/answers";

  constructor(private http: HttpClient) { }

  saveAnswers(answers: IAnswer[]) {
    // ToDo: Maybe support posting of list in API ?
    // this.http.post<IResponse<IAnswer[]>>(this.BASE_URL, answers).subscribe();

    for (const answer of answers) {
      this.http.post<IResponse<IAnswer>>(this.BASE_URL, answer).subscribe();
    }
  }

  updateAnswer(answer:IAnswer) {
    // this.http.put<IResponse<IAnswer>>(this.BASE_URL + "/" + answer.id, answer).subscribe();
    this.http.put<IResponse<IAnswer>>(this.BASE_URL, answer).subscribe();
  }
}
