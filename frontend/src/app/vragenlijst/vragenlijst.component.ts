import { Component, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '../services/categories.service';

@Component({
  selector: 'app-vragenlijst',
  standalone: true,
  imports: [],
  templateUrl: './vragenlijst.component.html',
  styleUrl: './vragenlijst.component.css'
})
export class VragenlijstComponent implements OnInit {
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
