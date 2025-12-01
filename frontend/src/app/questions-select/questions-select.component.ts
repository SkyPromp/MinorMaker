import {Component, OnInit} from '@angular/core';
import {QuestionV2Service} from "../services/question-v2.service";
import {IQuestion} from "../model/question.interface";
import {IAnswer} from "../model/answer.interface";
import {IResponse} from "../model/response.interface";
import {CurrentSurveyService} from "../services/current-survey.service";
import {Router} from "@angular/router";
import {AnswerService} from "../services/answer.service";

@Component({
  selector: 'app-questions-select',
  standalone: true,
  imports: [],
  templateUrl: './questions-select.component.html',
  styleUrl: './questions-select.component.css'
})
export class QuestionsSelectComponent implements OnInit {

  questions :IQuestion[] = [];
  answers :IAnswer[] = [];

  constructor(
    private questionService :QuestionV2Service,
    protected currentSurveyService :CurrentSurveyService,
    private router:Router,
    private answerService :AnswerService,
  ) { }

  ngOnInit() {
    this.questionService.getAll().subscribe((res : IResponse<IQuestion[]>) => {
      this.questions = res.data;

      for (let data of res.data) {
        this.answers.push({
          id: null,
          questionId: data.id,
          userId: this.currentSurveyService.getCurrentUser()!.id,
          // ToDo: Change back to null when API allows it
          answer: null,
          // answer: 1,
          questionMoment: null,
          timestamp: null,
          note: null
        })
      }
    });
  }

  isQuestionSelected(questionId:number) {
    let answer = this.answers.find((answer) => answer.questionId == questionId);

    if (answer?.answer == null) {
      return false;
    } else if (answer.answer == 4) {
      return true;
    }
    return false;
  }

  toggleAnswer(questionId:number) {
    let answer = this.answers.find((answer) => answer.questionId == questionId);

    // ToDo: Make this elegant
    if (answer == null) {
      console.error("No answer with that questionId (" + questionId + ")");
      return;
    }

    if (answer.answer == 4) {
      answer.answer = null;
    }
    else {
      answer.answer = 4;
    }
  }


  isEverythingSelected() {
    let unselected = this.answers.find((answer) => answer.answer != null);

    return unselected == undefined;

  }

  toggleAll() {
    if (this.isEverythingSelected()) {
      for (const answer of this.answers) {
        answer.answer = 4;
      }
    }
    else {
      for (const answer of this.answers) {
        answer.answer = null;
      }
    }
  }

  navigateBack() {
    this.router.navigate(['user-select']);
  }

  startSurvey() {
    this.answerService.saveAnswers(this.answers);
    this.currentSurveyService.updateCurrentAnswer();

    this.router.navigate(['/survey']);
  }

}
