import {Injectable} from '@angular/core';
import {IUser} from "../model/user.interface";
import {RoleEnum} from "../model/role.enum";
import {IQuestion} from "../model/question.interface";
import {IAnswer} from "../model/answer.interface";
import {QuestionV2Service} from "./question-v2.service";
import {IResponse} from "../model/response.interface";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentSurveyService {

  private currentUser: IUser | null = null;
  // private currentUser: IUser = {
  //   id: -1,
  //   firstname: "John",
  //   lastname: "Doe",
  //   role: RoleEnum.CLIENT
  // }

  private userAnswers: IAnswer[] = [
    {
      id: -1,
      questionId: 1,
      answer: 4,
      note: null,
      timestamp: null,
      userId: -1,
      questionMoment: -1
    },
    {
      id: -2,
      questionId: 2,
      answer: null,
      note: null,
      timestamp: null,
      userId: -1,
      questionMoment: -1
    },
    {
      id: -3,
      questionId: 3,
      answer: null,
      note: null,
      timestamp: null,
      userId: -1,
      questionMoment: -1
    },
    {
      id: -4,
      questionId: 4,
      answer: null,
      note: null,
      timestamp: null,
      userId: -1,
      questionMoment: -1
    },
  ];
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

  constructor(private questionV2Service: QuestionV2Service) { }

  getCurrentUser(): IUser | null {
    return this.currentUser;
  }
  setCurrentUser(user: IUser): void {
    if (user.role == RoleEnum.CLIENT) {
      this.currentUser = user;
    }
  }

  // private _currentAnswer :IAnswer | null = null;
  private _currentAnswer :IAnswer | null = {
    id: -1,
    questionId: 1,
    answer: null,
    note: null,
    timestamp: null,
    userId: -1,
    questionMoment: -1
  }

  get currentAnswer() :IAnswer | null {
    return this._currentAnswer;
  }
  set currentAnswer (value :IAnswer | null) {
    this._currentAnswer = value;
  }

  updateCurrentAnswer () {
    let nextAnswer = this.userAnswers.find(a => !a.answer);

    if (nextAnswer) {
      this.currentAnswer = nextAnswer;
    }
    else {
      this.currentAnswer = null;
    }
  }

  getNextQuestion(): Observable<IQuestion | null> {
    const id = this.userAnswers.find(a => !a.answer)?.questionId;

    return id
      ? this.questionV2Service.getById(id).pipe(map(res => res.data))
      : of(null);
  }

}
