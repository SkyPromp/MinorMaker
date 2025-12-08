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
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    answer.timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

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
