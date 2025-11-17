import {Component, Input, input, OnInit} from '@angular/core';
import {IAnswer, IQuestion, QuestionService} from "../services/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {

  questionId: number = 1;

  question: IQuestion | undefined;

  @Input()
  answer: IAnswer | undefined;

  note: string = "";

  constructor(private questionService: QuestionService, private router: Router) {

  }

  ngOnInit() {
    this.questionService.getQuestion(this.questionId).subscribe(question => {
      this.question = question;
    });
  }

  saveNote() {
    this.answer!.note = this.note;

    this.questionService.updateAnswer(this.answer!)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          // this.router.navigate(['/home']);
        }
      });
  }

  skip() {
    this.router.navigate(['/home']);
  }

}
