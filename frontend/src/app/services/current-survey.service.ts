import {Injectable} from '@angular/core';
import {IUser} from "../model/user.interface";
import {RoleEnum} from "../model/role.enum";
import {IAnswer} from "../model/answer.interface";
import {AnswerService} from "./answer.service";
import {map, Observable, switchMap, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentSurveyService {

  private currentUser: IUser | null = null;
  private userAnswers: IAnswer[] = [];

  constructor(private answerService: AnswerService) { }

  getCurrentUser(): IUser | null {
    return this.currentUser;
  }
  setCurrentUser(user: IUser | null): void {
    if (user == null) {
      return;
    }

    if (user.role == RoleEnum.CLIENT) {
      this.currentUser = user;
    }
  }

  private _currentAnswer :IAnswer | null = null;

  get currentAnswer() :IAnswer | null {
    return this._currentAnswer;
  }
  set currentAnswer (value :IAnswer | null) {
    this._currentAnswer = value;
  }

  updateCurrentAnswer () {
    let nextAnswer = this.userAnswers.find(a => a.answer == null);
    console.log("updating answer")

    if (nextAnswer) {
      this.currentAnswer = nextAnswer;
    }
    else {
      // this.currentAnswer = null;
      this._currentAnswer = null;
    }
  }

  setAnswerPoule(): Observable<IAnswer[]> {
    if (this.currentUser?.id == null) {
      console.error("No current user");
      return throwError(() => new Error("No current user"));
    }

    return this.answerService.getCurrentQuestionMomentByUserId(this.currentUser.id).pipe(
      switchMap(res => {
        if (res.data == null) {
          console.error("No active question moment for this user");
          return throwError(() => new Error("No active question moment"));
        }
        return this.answerService.getAnswersByQuestionMomentId(res.data);
      }),
      map(res => res.data),
      tap(answers => {
        this.userAnswers = answers;
        console.log("User answers set");
        this.updateCurrentAnswer();
      })
    );
  }

}
