export interface IAnswer {
  id: number | null;
  questionId: number;
  answer: number | null;
  note: string | null;
  timestamp: string | null;
  userId: number;
  questionMoment: number | null;
}
