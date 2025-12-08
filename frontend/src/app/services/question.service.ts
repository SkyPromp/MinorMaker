import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  BASE_URL: string = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<IResponse<IQuestion[]>> {
    return this.http.get<IResponse<IQuestion[]>>(`${this.BASE_URL}/questions`);
  }

  getQuestion(id: number): Observable<IQuestion> {
    return this.http
      .get<IResponse<IQuestion>>(`${this.BASE_URL}/questions/${id}`)
      .pipe(map((response) => response.data || (response as any)));
  }

  addQuestion(
    question: string,
    category: string
  ): Observable<IResponse<IQuestion>> {
    return this.http.post<IResponse<IQuestion>>(`${this.BASE_URL}/questions`, {
      question: question,
      category: category,
    });
  }

  updateQuestion(
    id: number,
    question: string,
    category: string
  ): Observable<IResponse<IQuestion>> {
    return this.http.put<IResponse<IQuestion>>(
      `${this.BASE_URL}/questions/${id}`,
      {
        question: question,
        category: category,
      }
    );
  }

  deleteQuestion(id: number): Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${this.BASE_URL}/questions/${id}`);
  }

  saveAnswer(answer: IAnswerPost): Observable<IAnswer> {
    console.log("Saving answer:", answer);
    const savedAnswer: IAnswer = {
      id: Math.floor(Math.random() * 1000),
      questionId: answer.questionId,
      answer: answer.answer,
      note: answer.note || "",
      timestamp: new Date(),
    };
    return of(savedAnswer).pipe();
  }

  updateAnswer(answer: IAnswer): Observable<IAnswer> {
    console.log("Updating answer:", answer);
    return of(answer).pipe();
  }
}

export interface IQuestion {
  id: number;
  question: string;
  category: string;
}

export interface IAnswer {
  id: number | null;
  questionId: number;
  answer: number;
  note: string;
  timestamp?: Date;
}
export interface IAnswerPost {
  questionId: number;
  answer: number;
  note?: string;
}
export interface IResponse<T> {
  data: T;
  status: string;
}
