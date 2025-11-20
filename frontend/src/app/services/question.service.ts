import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {delay, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  getQuestions(): Observable<IQuestion[]> {
    return of(this.questions).pipe(delay(500));
  }

  getQuestion(id: number): Observable<IQuestion> {
    const question = this.questions.find(q => q.id === id) || {
      id: -1,
      question: "Question not found",
      category: "eten"
    };
    return of(question).pipe(delay(300));
  }

  getQuestionsByCategory(category: string): Observable<IQuestion[]> {
    const filteredQuestions = this.questions.filter(q => q.category === category);
    return of(filteredQuestions).pipe(delay(400));
  }

  saveAnswer(answer: IAnswerPost): Observable<IAnswer> {
    console.log("Saving answer:", answer);
    const savedAnswer: IAnswer = {
      id: Math.floor(Math.random() * 1000),
      questionId: answer.questionId,
      answer: answer.answer,
      note: answer.note || '',
      timestamp: new Date()
    };
    return of(savedAnswer).pipe(delay(800));
  }

  updateAnswer(answer: IAnswer): Observable<IAnswer> {
    console.log("Updating answer:", answer);
    return of(answer).pipe(delay(800));
  }

  private questions: IQuestion[] = [
    {
      id: 1,
      question: "Hoe tevreden bent u over de kwaliteit van het eten?",
      category: "eten"
    },
    {
      id: 2,
      question: "Hoe smaakvol vindt u de maaltijden?",
      category: "eten"
    },
    {
      id: 3,
      question: "Hoe tevreden bent u over de variatie in het menu?",
      category: "eten"
    },
    {
      id: 4,
      question: "Hoe tevreden bent u over de presentatie van het eten?",
      category: "eten"
    },
    {
      id: 5,
      question: "Hoe tevreden bent u over de temperatuur van de maaltijden?",
      category: "eten"
    },
    {
      id: 6,
      question: "Hoe tevreden bent u over de beschikbaarheid van eten buiten reguliere tijden?",
      category: "eten"
    },
    {
      id: 7,
      question: "Hoe tevreden bent u over de professionele houding van het zorgpersoneel?",
      category: "zorg"
    },
    {
      id: 8,
      question: "Hoe tevreden bent u over de beschikbaarheid van zorgpersoneel?",
      category: "zorg"
    },
    {
      id: 9,
      question: "Hoe tevreden bent u over de communicatie van het zorgpersoneel?",
      category: "zorg"
    },
    {
      id: 10,
      question: "Hoe tevreden bent u over de privacy tijdens zorgmomenten?",
      category: "zorg"
    },
    {
      id: 11,
      question: "Hoe tevreden bent u over de snelheid van reageren bij hulpvragen?",
      category: "zorg"
    },
    {
      id: 12,
      question: "Hoe tevreden bent u over de deskundigheid van het zorgpersoneel?",
      category: "zorg"
    },
    {
      id: 13,
      question: "Hoe tevreden bent u over de variatie in activiteiten?",
      category: "activiteiten"
    },
    {
      id: 14,
      question: "Hoe tevreden bent u over de begeleiding tijdens activiteiten?",
      category: "activiteiten"
    },
    {
      id: 15,
      question: "Hoe tevreden bent u over de frequentie van activiteiten?",
      category: "activiteiten"
    },
    {
      id: 16,
      question: "Hoe tevreden bent u over de aansluiting van activiteiten bij uw interesses?",
      category: "activiteiten"
    },
    {
      id: 17,
      question: "Hoe tevreden bent u over de locaties waar activiteiten plaatsvinden?",
      category: "activiteiten"
    },
    {
      id: 18,
      question: "Hoe tevreden bent u over de informatievoorziening over activiteiten?",
      category: "activiteiten"
    }
  ];

}

export interface IQuestion {
  id: number;
  question: string;
  category: string;
}

export interface IAnswer {
  id: number;
  questionId: number;
  answer: number;
  note: string;
  timestamp?: Date; // Todo make datetime
}
export interface IAnswerPost {
  questionId: number;
  answer: number;
  note?: string;
}
