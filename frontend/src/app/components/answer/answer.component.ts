import {Component, HostListener, Input} from '@angular/core';
import {IAnswer, IAnswerPost, QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  @Input() questionId : number | undefined;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'k':
      case 'K':
        this.registerAnswer(AnswerType.HAPPY)
        break;
      case 'l':
      case 'L':
        this.registerAnswer(AnswerType.NEUTRAL)
        break;
      case 'm':
      case 'M':
        this.registerAnswer(AnswerType.ANGRY)
        break;
    }
  }

  constructor(private questionService: QuestionService) {}

  registerAnswer(userAnswer :AnswerType) {
    if (this.questionId == undefined) {
      console.log("Wait until a question is shown");
      return;
    }

    let answer :IAnswerPost = {
      questionId: this.questionId,
      answer: userAnswer,
      note: null
    }

    this.questionService.saveAnswer(answer);
  }

  protected readonly AnswerType = AnswerType;
}

export enum AnswerType {
  NOT_APPLICABLE, HAPPY, NEUTRAL, ANGRY
}
