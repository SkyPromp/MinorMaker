import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAnswer} from "../model/answer.interface";
import {IResponse} from "../model/response.interface";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  BASE_URL :string = "http://localhost:5000/api/answers";

  constructor(private http: HttpClient) { }

  saveAnswers(answers: IAnswer[]) {
    // ToDo: Maybe support posting of list in API ?
    // this.http.post<IResponse<IAnswer[]>>(this.BASE_URL, answers).subscribe();

    // for (const answer of answers) {
    //   this.http.post<IResponse<IAnswer>>(this.BASE_URL, answer).subscribe();
    // }

    console.log("saving answers");
    return this.http.post<IResponse<IAnswer[]>>(this.BASE_URL + "/batch", answers);
  }

  updateAnswer(answer:IAnswer) {
    // this.http.put<IResponse<IAnswer>>(this.BASE_URL + "/" + answer.id, answer).subscribe();
    this.http.put<IResponse<IAnswer>>(this.BASE_URL, answer).subscribe();
  }

  getNextQuestionMomentId() {
    return this.http.get<IResponse<(number | null)[]>>("http://localhost:5000/api/questionMoments").pipe(
      map(response => {
        const ids = (response.data || []).filter((id): id is number => id !== null);
        if (ids.length === 0) return 1;
        return Math.max(...ids) + 1;
      })
    );
  }

  getAnswersByQuestionMomentId(questionMomentId: number) {
    return this.http.get<IResponse<IAnswer[]>>(this.BASE_URL + `?questionMoment=${questionMomentId}`);
  }

  getCurrentQuestionMomentByUserId(userId: number) {
    return this.http.get<IResponse<number | null>>(`http://localhost:5000/api/users/${userId}/currentQuestionMoment`);
  }
}
