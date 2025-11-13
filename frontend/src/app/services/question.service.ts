import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {delay, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  getQuestion(id :number) :Observable<IQuestion> {
    let question :IQuestion = {
        id: -1,
        question: "What is your question?",
      }

    return of(question).pipe(delay(1000));
  }

}

export interface IQuestion {
  id: number;
  question: string;
  // answers: IAnswer[]
}

// export interface IAnswerOption {
//   id: number;
//   questionId: number;
//   answer: string;
// }

export interface IAnswer {
  id: number;
  questionId: number;
  answer: number;
  note :string;
}
