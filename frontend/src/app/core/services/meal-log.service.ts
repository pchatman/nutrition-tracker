import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MealLog } from '../models/meal-log.model';

@Injectable({ providedIn: 'root' })
export class MealLogService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/meal-logs`;

  logMeal(log: MealLog): Observable<MealLog> {
    return this.http.post<MealLog>(this.url, log);
  }

  getDailyLog(date: string): Observable<MealLog[]> {
    return this.http.get<MealLog[]>(`${this.url}/daily`, { params: { date } });
  }

  getDailyCalories(date: string): Observable<{ totalCalories: number }> {
    return this.http.get<{ totalCalories: number }>(
      `${this.url}/calories`, { params: { date } }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
