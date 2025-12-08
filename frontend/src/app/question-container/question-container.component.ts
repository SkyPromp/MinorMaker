import {Component, OnInit} from '@angular/core';
import {CurrentSurveyService} from "../services/current-survey.service";
import {IQuestion} from "../model/question.interface";
import {AnswerComponent, AnswerType} from "../components/answer/answer.component";
import {Router} from "@angular/router";
import {AnswerService} from "../services/answer.service";
import {NoteComponent} from "../note/note.component";
import {QuestionV2Service} from "../services/question-v2.service";

@Component({
  selector: 'app-question-container',
  standalone: true,
  imports: [
    AnswerComponent,
    NoteComponent
  ],
  templateUrl: './question-container.component.html',
  styleUrl: './question-container.component.css'
})
export class QuestionContainerComponent implements OnInit {

  currentQuestion :IQuestion | null = null;
  loading: boolean = true;

  constructor(
    protected currentSurveyService: CurrentSurveyService,
    private router: Router,
    private answerService: AnswerService,
    private questionV2Service: QuestionV2Service,
  ) {
  }

  // ngOnInit() {
  //   setTimeout(() => {
  //     this.updateCurrentQuestion();
  //     this.loading = false;
  //   }, 500);
  // }
  ngOnInit() {
    // First, populate userAnswers, then update the current question
    this.currentSurveyService.setAnswerPoule().subscribe(() => {
      this.updateCurrentQuestion();
      this.loading = false;
    });
  }

  updateCurrentQuestion() {
    if (this.currentSurveyService.currentAnswer) {
      this.questionV2Service.getById(this.currentSurveyService.currentAnswer.questionId).subscribe(res => {
          this.currentQuestion = res.data;
        }
      )
    }
    else {
      console.error("There is no answer active at the moment")
    }
  }

  onAnswerSaved(answer :AnswerType) {

    if (this.currentSurveyService.currentAnswer) {
      this.currentSurveyService.currentAnswer.answer = answer;

      this.answerService.updateAnswer(this.currentSurveyService.currentAnswer);

      if (answer == AnswerType.NOT_APPLICABLE) {
        this.currentSurveyService.currentAnswer.note = "";
        this.currentSurveyService.updateCurrentAnswer();
        this.updateCurrentQuestion();
      }
    }
    else {
      console.error("Cannot update current answer because it is null (update answer)")
    }
  }

  onNoteSaved(note :string) {
    if (this.currentSurveyService.currentAnswer) {
      this.currentSurveyService.currentAnswer.note = note;

      this.answerService.updateAnswer(this.currentSurveyService.currentAnswer);

      this.currentSurveyService.updateCurrentAnswer();
      this.updateCurrentQuestion();
    }
    else {
      console.error("Cannot update current answer because it is null (update note)")
    }
  }


  navigateToHome() {
    this.currentSurveyService.setCurrentUser(null);
    this.router.navigate(['/home']);
  }

}
