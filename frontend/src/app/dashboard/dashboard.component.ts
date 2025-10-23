import {Component, OnInit} from '@angular/core';
import {CategoriesService, ICategory} from "../services/categories.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
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
