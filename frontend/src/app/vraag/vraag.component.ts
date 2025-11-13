import { Component, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '../services/categories.service';
import { QuestionService } from "../services/question.service";

@Component({
  selector: 'app-vraag',
  standalone: true,
  imports: [],
  templateUrl: './vraag.component.html',
  styleUrl: './vraag.component.css'
})
export class VraagComponent {

  constructor(private questionService : QuestionService) {

  }

}
