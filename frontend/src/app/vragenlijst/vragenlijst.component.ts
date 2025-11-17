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
  paginatedQuestions: IQuestion[] = [];
  isLoading = true;
  areCategoriesLoading = true;
  selectedCategory: string = 'all';
  searchTerm: string = '';
  
  // Paginatie variabelen
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  
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
    this.updatePagination();
  }

  updatePagination(): void {
    // Bereken totaal aantal pagina's
    this.totalPages = Math.ceil(this.filteredQuestions.length / this.pageSize);
    
    // Zorg dat currentPage binnen de grenzen blijft
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
    
    // Bereken start en end index voor huidige pagina
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    // Haal vragen op voor huidige pagina
    this.paginatedQuestions = this.filteredQuestions.slice(startIndex, endIndex);
  }

  onCategoryChange(): void {
    this.currentPage = 1; // Reset naar eerste pagina bij filter wijziging
    this.applyFilters();
  }

  onSearchChange(): void {
    this.currentPage = 1; // Reset naar eerste pagina bij zoeken
    this.applyFilters();
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset naar eerste pagina bij page size wijziging
    this.applyFilters();
  }

  // Paginatie methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Helper methods voor paginatie weergave
  getVisiblePages(): number[] {
    const visiblePages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    // Aanpassen als we niet genoeg pagina's aan het einde hebben
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    
    return visiblePages;
  }

  get showEllipsisStart(): boolean {
    return this.getVisiblePages()[0] > 1;
  }

  get showEllipsisEnd(): boolean {
    return this.getVisiblePages()[this.getVisiblePages().length - 1] < this.totalPages;
  }

  getDisplayedRange(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.filteredQuestions.length);
    return `${start}-${end}`;
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