import { Component, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '../services/categories.service';
import {IQuestion, QuestionService } from "../services/question.service";
import { AnswerComponent } from "../components/answer/answer.component";

@Component({
  selector: 'app-vraag',
  standalone: true,
  imports: [ AnswerComponent ],
  templateUrl: './vraag.component.html',
  styleUrl: './vraag.component.css'
})
export class VraagComponent implements OnInit {

  question : IQuestion | undefined = undefined;

  constructor(private questionService : QuestionService) {

  }

  ngOnInit() {
    this.questionService.getQuestion(-1).subscribe(question => {
      this.question = question;
    })
  }

}
