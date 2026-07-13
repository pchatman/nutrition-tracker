import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Food } from '../models/food.model';

@Injectable({ providedIn: 'root' })
export class FoodService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/foods`;

  search(query: string): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.url}/search`, { params: { query } });
  }

  getById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.url}/${id}`);
  }

  create(food: Food): Observable<Food> {
    return this.http.post<Food>(this.url, food);
  }
}
