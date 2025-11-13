import { Component, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '../services/categories.service';

@Component({
  selector: 'app-vraag',
  standalone: true,
  imports: [],
  templateUrl: './vraag.component.html',
  styleUrl: './vraag.component.css'
})
export class VraagComponent implements OnInit {
  categories: ICategory[] = []

  constructor(private categoryService : CategoriesService) {

  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }
}
