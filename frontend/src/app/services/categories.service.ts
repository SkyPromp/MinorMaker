import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  public getCategories(): Observable<ICategory[]> {
    const categories: ICategory[] = [
      {
        id: -1,
        name: 'eten',
        pictogram: 'assets/pictograms/eten.png',
      },
      {
        id: -2,
        name: 'zorg',
        pictogram: 'assets/pictograms/zorg.png',
      },
      {
        id: -3,
        name: "activiteiten",
        pictogram: 'assets/pictograms/activities.png',
      }
    ];

    return of(categories).pipe(delay(3000));
  }
}

export interface ICategory {
  id: number;
  name: string;
  pictogram: string;
}
