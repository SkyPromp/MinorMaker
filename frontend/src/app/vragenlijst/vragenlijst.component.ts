import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService, IQuestion } from '../services/question.service';
import { CategoriesService, ICategory } from '../services/categories.service';

@Component({
  selector: 'app-vragenlijst',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vragenlijst.component.html',
  styleUrl: './vragenlijst.component.css'
})
export class VragenlijstComponent implements OnInit {
  questions: IQuestion[] = [];
  categories: ICategory[] = [];
  filteredQuestions: IQuestion[] = [];
  isLoading = true;
  areCategoriesLoading = true;
  selectedCategory: string = 'all';
  searchTerm: string = '';
  
  // Voor het toevoegen/bewerken van vragen
  showAddForm = false;
  editingQuestion: IQuestion | null = null;
  newQuestion: Partial<IQuestion> = {
    question: '',
    category: 'eten'
  };

  constructor(
    private questionService: QuestionService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadQuestions();
  }

  loadCategories(): void {
    this.areCategoriesLoading = true;
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.areCategoriesLoading = false;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.areCategoriesLoading = false;
      }
    });
  }

  loadQuestions(): void {
    this.isLoading = true;
    this.questionService.getQuestions().subscribe({
      next: (questions) => {
        this.questions = questions;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = this.questions;

    // Filter op categorie
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === this.selectedCategory);
    }

    // Filter op zoekterm
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(term) ||
        this.getCategoryName(q.category).toLowerCase().includes(term)
      );
    }

    this.filteredQuestions = filtered;
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  getCategoryName(categoryKey: string): string {
    const category = this.categories.find(c => c.name === categoryKey);
    return category ? this.capitalizeFirstLetter(category.name) : categoryKey;
  }

  getCategoryPictogram(categoryKey: string): string {
    const category = this.categories.find(c => c.name === categoryKey);
    return category ? category.pictogram : '';
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Navigeer naar vraag details
  viewQuestion(question: IQuestion): void {
    this.router.navigate(['/vraag', question.id]);
  }

  // Toon formulier voor nieuwe vraag
  showAddQuestionForm(): void {
    this.newQuestion = {
      question: '',
      category: 'eten'
    };
    this.editingQuestion = null;
    this.showAddForm = true;
  }

  // Bewerk een bestaande vraag
  editQuestion(question: IQuestion): void {
    this.editingQuestion = question;
    this.newQuestion = { ...question };
    this.showAddForm = true;
  }

  // Sla een nieuwe vraag op
  saveQuestion(): void {
    if (!this.newQuestion.question?.trim()) {
      alert('Vul een vraag in');
      return;
    }

    if (this.editingQuestion) {
      // Bewerk bestaande vraag
      const updatedQuestion: IQuestion = {
        id: this.editingQuestion.id,
        question: this.newQuestion.question!,
        category: this.newQuestion.category!
      };

      // In een echte app zou je hier een update service call doen
      const index = this.questions.findIndex(q => q.id === this.editingQuestion!.id);
      if (index !== -1) {
        this.questions[index] = updatedQuestion;
      }
    } else {
      // Voeg nieuwe vraag toe
      const newQuestion: IQuestion = {
        id: this.generateQuestionId(),
        question: this.newQuestion.question!,
        category: this.newQuestion.category!
      };
      this.questions.unshift(newQuestion);
    }

    this.applyFilters();
    this.cancelEdit();
  }

  // Verwijder een vraag
  deleteQuestion(question: IQuestion): void {
    if (confirm(`Weet u zeker dat u de vraag "${question.question}" wilt verwijderen?`)) {
      this.questions = this.questions.filter(q => q.id !== question.id);
      this.applyFilters();
    }
  }

  // Annuleer bewerken/toevoegen
  cancelEdit(): void {
    this.showAddForm = false;
    this.editingQuestion = null;
    this.newQuestion = {
      question: '',
      category: 'eten'
    };
  }

  // Genereer een nieuw ID (in een echte app zou dit door de backend gedaan worden)
  private generateQuestionId(): number {
    const maxId = Math.max(...this.questions.map(q => q.id), 0);
    return maxId + 1;
  }

  // Tel vragen per categorie
  getQuestionCountByCategory(category: string): number {
    return this.questions.filter(q => q.category === category).length;
  }

  get totalQuestions(): number {
    return this.questions.length;
  }
}