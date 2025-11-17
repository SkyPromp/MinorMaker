import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService, IQuestion, IAnswer, IAnswerPost } from '../services/question.service';
import { CategoriesService, ICategory } from '../services/categories.service';

@Component({
  selector: 'app-vraaglijst-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vraaglijst-details.component.html',
  styleUrl: './vraaglijst-details.component.css'
})
export class VraaglijstDetailsComponent implements OnInit {
  question: IQuestion | null = null;
  category: ICategory | null = null;
  isLoading = true;
  error: string | null = null;
  
  // Voor antwoord statistieken (in een echte app zou dit van de backend komen)
  answerStats = {
    totalAnswers: 0,
    averageRating: 0,
    ratingDistribution: {
      1: 0,
      2: 0,
      3: 0,
    },
    recentAnswers: [] as IAnswer[]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadQuestionDetails();
  }

  loadQuestionDetails(): void {
    const questionId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(questionId)) {
      this.error = 'Ongeldig vraag ID';
      this.isLoading = false;
      return;
    }

    this.questionService.getQuestion(questionId).subscribe({
      next: (question) => {
        this.question = question;
        this.loadCategoryDetails(question.category);
        this.loadAnswerStats(question.id);
      },
      error: (error) => {
        this.error = 'Fout bij het laden van de vraag';
        this.isLoading = false;
        console.error('Error loading question:', error);
      }
    });
  }

  loadCategoryDetails(categoryName: string): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.category = categories.find(c => c.name === categoryName) || null;
      },
      error: (error) => {
        console.error('Error loading category:', error);
      }
    });
  }

  loadAnswerStats(questionId: number): void {
    // In een echte app zou je hier een service call doen naar de backend
    // Voor nu simuleren we wat statistieken
    setTimeout(() => {
      this.answerStats = {
        totalAnswers: 20,
        averageRating: 2,
        ratingDistribution: {
          1: 5,
          2: 10,
          3: 5,
        },
        recentAnswers: [
          {
            id: 1,
            questionId: questionId,
            answer: 3,
            note: 'Zeer tevreden over de service',
            timestamp: new Date('2024-01-15')
          },
          {
            id: 2,
            questionId: questionId,
            answer: 3,
            note: 'Uitstekende kwaliteit!',
            timestamp: new Date('2024-01-14')
          },
          {
            id: 3,
            questionId: questionId,
            answer: 2,
            note: 'Kan beter',
            timestamp: new Date('2024-01-13')
          },
          {
            id: 4,
            questionId: questionId,
            answer: 1,
            note: 'Niet tevreden',
            timestamp: new Date('2024-01-12')
          }
        ]
      };
      this.isLoading = false;
    }, 1000);
  }

  getRatingText(rating: number): string {
    const ratings = {
      1: 'Ontevreden',
      2: 'Neutraal', 
      3: 'Tevreden'
    };
    return ratings[rating as keyof typeof ratings] || 'Onbekend';
  }

  getRatingPercentage(rating: number): number {
    if (this.answerStats.totalAnswers === 0) return 0;
    return (this.answerStats.ratingDistribution[rating as keyof typeof this.answerStats.ratingDistribution] / this.answerStats.totalAnswers) * 100;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  goBack(): void {
    this.router.navigate(['/vragenlijst']);
  }

  editQuestion(): void {
    if (this.question) {
      this.router.navigate(['/vragenlijst'], { 
        fragment: `edit-${this.question.id}` 
      });
    }
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(3 - rating);
  }

  // Helper method om rating count op te halen
  getRatingCount(rating: number): number {
    return this.answerStats.ratingDistribution[rating as keyof typeof this.answerStats.ratingDistribution];
  }

  // Helper method om positieve antwoorden te tellen
  getPositiveAnswersCount(): number {
    return this.answerStats.ratingDistribution[3];
  }

  // Helper method om negatieve antwoorden te tellen
  getNegativeAnswersCount(): number {
    return this.answerStats.ratingDistribution[1];
  }

  getRoundedAverage(): number {
    return Math.round(this.answerStats.averageRating);
  }

  // Voeg deze helper method toe aan de component class:
  getCategoryDisplayName(category: string): string {
    const categoryNames: { [key: string]: string } = {
      'eten': 'Eten',
      'zorg': 'Zorg', 
      'activiteiten': 'Activiteiten'
    };
    return categoryNames[category] || category;
  }
}