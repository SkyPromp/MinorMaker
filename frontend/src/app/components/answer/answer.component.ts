import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {IAnswer, IAnswerPost, QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
  export class AnswerComponent {

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'k':
      case 'K':
        this.selectAnswer(AnswerType.HAPPY)
        break;
      case 'l':
      case 'L':
        this.selectAnswer(AnswerType.NEUTRAL)
        break;
      case 'm':
      case 'M':
        this.selectAnswer(AnswerType.ANGRY)
        break;
    }
  }

  @Output() answerSaved = new EventEmitter<AnswerType>();

  selectedAnswer :AnswerType | null = null;

  constructor() {}

  selectAnswer(answer: AnswerType) {
    this.selectedAnswer = answer;
  }

  deselectAnswer() {
    this.selectedAnswer = null;
  }

  saveAnswer() {
    if (this.selectedAnswer != null) {
      this.answerSaved.emit(this.selectedAnswer);
    }
  }

  protected readonly AnswerType = AnswerType;
}

export enum AnswerType {
  NOT_APPLICABLE, HAPPY, NEUTRAL, ANGRY
}
