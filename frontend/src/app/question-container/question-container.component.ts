import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../components/footer/footer.component";
import {CurrentSurveyService} from "../services/current-survey.service";
import {IQuestion} from "../model/question.interface";
import {AnswerComponent, AnswerType} from "../components/answer/answer.component";
import {Router} from "@angular/router";
import {AnswerService} from "../services/answer.service";
import {NoteComponent} from "../note/note.component";

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

    // this.currentQuestion = null;

    this.currentQuestion = {
      id: -1,
      question: "Vind je badminton leuk?",
      category: "Sport",
      image: "https://www.sclera.be/resources/pictos/badminton.png"
    }
  }

  onAnswerSaved(answer :AnswerType) {

    if (this.currentSurveyService.currentAnswer) {
      this.currentSurveyService.currentAnswer.answer = answer;

      this.answerService.updateAnswer(this.currentSurveyService.currentAnswer);
    }
    else {
      console.error("Cannot update current answer because it is null")
    }
  }


  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
