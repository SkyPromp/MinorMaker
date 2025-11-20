import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IQuestion} from "../model/IQuestion.interface";

@Injectable({
  providedIn: 'root'
})
export class QuestionV2Service {

  questions: IQuestion[];
  currentQuestion : IQuestion;


  constructor(private http: HttpClient) {
    // ToDo: Get data from backend
    this.questions = [];
    this.currentQuestion = this.questions[0];
  }


  GetNextQuestion() {
    this.currentQuestion = this.questions[this.currentQuestion.orderNr + 1];
  }

  GetPreviousQuestion() {
    this.currentQuestion = this.questions[this.currentQuestion.orderNr - 1];
  }
}
