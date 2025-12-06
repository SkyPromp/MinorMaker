import {Injectable} from '@angular/core';
import {IUser} from "../model/user.interface";
import {RoleEnum} from "../model/role.enum";
import {IAnswer} from "../model/answer.interface";
import {AnswerService} from "./answer.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentSurveyService {

  private currentUser: IUser | null = null;
  // private currentUser: IUser = {
  //   id: -1,
  //   firstName: "John",
  //   lastName: "Doe",
  //   role: RoleEnum.CLIENT
  // }

  // ToDo:  Get answers from API
  //        (either new or current questionMoment based on input from user-select - question-select
  private userAnswers: IAnswer[] = [];
  // private userAnswers: IAnswer[] = [
  //   {
  //     id: -1,
  //     questionId: 1,
  //     answer: 4,
  //     note: null,
  //     timestamp: null,
  //     userId: -1,
  //     questionMoment: -1
  //   },
  //   {
  //     id: -2,
  //     questionId: 2,
  //     answer: null,
  //     note: null,
  //     timestamp: null,
  //     userId: -1,
  //     questionMoment: -1
  //   },
  //   {
  //     id: -3,
  //     questionId: 3,
  //     answer: null,
  //     note: null,
  //     timestamp: null,
  //     userId: -1,
  //     questionMoment: -1
  //   },
  //   {
  //     id: -4,
  //     questionId: 4,
  //     answer: null,
  //     note: null,
  //     timestamp: null,
  //     userId: -1,
  //     questionMoment: -1
  //   },
  // ];

  // private currentSurvey :IQuestion[] = [
  //   {
  //     id: -1,
  //     question: "Do you like cats?",
  //     category: "Pets"
  //   },
  //   {
  //     id: -2,
  //     question: "Do you like dogs?",
  //     category: "Pets"
  //   }
  // ];

  constructor(private answerService: AnswerService) { }

  getCurrentUser(): IUser | null {
    return this.currentUser;
  }
  setCurrentUser(user: IUser): void {
    if (user.role == RoleEnum.CLIENT) {
      this.currentUser = user;
    }
  }

  private _currentAnswer :IAnswer | null = null;
  // private _currentAnswer :IAnswer | null = {
  //   id: -1,
  //   questionId: 1,
  //   answer: null,
  //   note: null,
  //   timestamp: null,
  //   userId: -1,
  //   questionMoment: -1
  // }

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

  // getNextQuestion(): Observable<IQuestion | null> {
  //   const id = this.userAnswers.find(a => !a.answer)?.questionId;
  //
  //   return id
  //     ? this.questionV2Service.getById(id).pipe(map(res => res.data))
  //     : of(null);
  // }

  setAnswerPoule() {
    if (this.currentUser?.id == null) {
      console.error("No current user");
      return;
    }

    this.answerService.getCurrentQuestionMomentByUserId(this.currentUser.id).subscribe(res => {
      if (res.data == null) {
        console.error("No active question moment for this user");
        return;
      }

      this.answerService.getAnswersByQuestionMomentId(res.data).subscribe(innerRes => {
        this.userAnswers = innerRes.data;
        console.log("User answers set");
        this.updateCurrentAnswer();
      })
    })
  }

}
