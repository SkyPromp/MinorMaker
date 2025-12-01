import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../components/footer/footer.component";
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
    FooterComponent,
    AnswerComponent,
    NoteComponent
  ],
  templateUrl: './question-container.component.html',
  styleUrl: './question-container.component.css'
})
export class QuestionContainerComponent implements OnInit {

  currentQuestion :IQuestion | null = null;

  constructor(
    protected currentSurveyService: CurrentSurveyService,
    private router: Router,
    private answerService: AnswerService,
    private questionV2Service: QuestionV2Service,
  ) {
  }

  ngOnInit() {
    // this.currentSurveyService.getNextQuestion().subscribe(question => {
    //   if (question) {
    //     this.currentQuestion = question;
    //   }
    //   else {
    //     this.currentQuestion = null;
    //   }
    // });


    this.updateCurrentQuestion();


    // this.currentQuestion = null;

    // this.currentQuestion = {
    //   id: -1,
    //   question: "Vind je badminton leuk?",
    //   category: "Sport",
    //   image: "https://www.sclera.be/resources/pictos/badminton.png"
    // }
  }

  updateCurrentQuestion() {
    if (this.currentSurveyService.currentAnswer) {
      this.questionV2Service.getById(this.currentSurveyService.currentAnswer.questionId).subscribe(res => {
          this.currentQuestion = res.data;
        }
      )
    }
    else {
      console.error("There is not answer active at the moment")
    }
  }

  onAnswerSaved(answer :AnswerType) {

    if (this.currentSurveyService.currentAnswer) {
      this.currentSurveyService.currentAnswer.answer = answer;

      this.answerService.updateAnswer(this.currentSurveyService.currentAnswer);
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
    this.router.navigate(['/home']);
  }

}
