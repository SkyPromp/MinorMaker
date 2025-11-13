import { Component, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '../services/categories.service';
import {IQuestion, QuestionService } from "../services/question.service";

@Component({
  selector: 'app-vraag',
  standalone: true,
  imports: [],
  templateUrl: './vraag.component.html',
  styleUrl: './vraag.component.css'
})
export class VraagComponent {

  question : IQuestion | undefined = undefined;

  constructor(private questionService : QuestionService) {

  }

  ngOnInit() {
    this.questionService.getQuestion(-1).subscribe(question => {
      this.question = question;
    })
  }

}
