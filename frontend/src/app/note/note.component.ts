import {Component, EventEmitter, Input, input, OnInit, Output} from '@angular/core';
import {IAnswer, IQuestion, QuestionService} from "../services/question.service";
import {Router} from "@angular/router";
import {FooterComponent} from "../components/footer/footer.component";
import {CurrentSurveyService} from "../services/current-survey.service";
import {AnswerType} from "../components/answer/answer.component";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {

  @Output() noteSaved = new EventEmitter<string>();

  note: string = "";

  constructor(
    private router: Router,
    private currentSurveyService :CurrentSurveyService
  ) { }

  ngOnInit() {

  }

  saveNote() {
    this.noteSaved.emit(this.note);
  }

  skip() {
    this.noteSaved.emit("");
  }

}
