import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule }    from '@angular/material/card';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MealLogService }   from '../../core/services/meal-log.service';
import { AuthService }      from '../../core/services/auth.service';
import { MealLog, MealType } from '../../core/models/meal-log.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule,
    MatIconModule, MatProgressBarModule, MatDividerModule],
  template: `
    <div class="dashboard">
      <header class="top-bar">
        <h1>🥗 Nutrition Tracker</h1>
        <div class="user-bar">
          <span>{{ username$ | async }}</span>
          <button mat-stroked-button (click)="auth.logout()">Logout</button>
        </div>
      </header>

      <div class="stats-row">
        <mat-card class="stat-card">
          <mat-card-title>{{ dailyCalories | number:'1.0-0' }}</mat-card-title>
          <mat-card-subtitle>Calories Today</mat-card-subtitle>
          <mat-progress-bar mode="determinate"
            [value]="(dailyCalories / 2000) * 100"></mat-progress-bar>
          <small>Goal: 2000 kcal</small>
        </mat-card>
        <mat-card class="stat-card">
          <mat-card-title>{{ macros.protein | number:'1.0-1' }}g</mat-card-title>
          <mat-card-subtitle>Protein</mat-card-subtitle>
        </mat-card>
        <mat-card class="stat-card">
          <mat-card-title>{{ macros.carbs | number:'1.0-1' }}g</mat-card-title>
          <mat-card-subtitle>Carbs</mat-card-subtitle>
        </mat-card>
        <mat-card class="stat-card">
          <mat-card-title>{{ macros.fat | number:'1.0-1' }}g</mat-card-title>
          <mat-card-subtitle>Fat</mat-card-subtitle>
        </mat-card>
      </div>

      <div class="actions-row">
        <button mat-raised-button color="primary" routerLink="/food-search">
          + Log Food
        </button>
      </div>

      <div class="meals-grid">
        <mat-card *ngFor="let type of mealTypes" class="meal-card">
          <mat-card-header>
            <mat-card-title>{{ type }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div *ngFor="let log of getByType(type)" class="log-row">
              <span>{{ log.foodName }}</span>
              <span>{{ log.totalCalories | number:'1.0-0' }} kcal</span>
              <button mat-icon-button color="warn" (click)="delete(log.id!)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
            <p *ngIf="getByType(type).length === 0" class="empty">Nothing logged</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>`,
  styles: [`
    .dashboard { padding: 16px; max-width: 1200px; margin: 0 auto; }
    .top-bar { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
    .stats-row { display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; margin-bottom:16px; }
    .stat-card { text-align:center; padding:12px; }
    .stat-card mat-card-title { font-size:2rem; color:#388e3c; }
    .actions-row { margin-bottom:16px; }
    .meals-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; }
    .log-row { display:flex; justify-content:space-between; align-items:center; padding:4px 0; }
    .empty { color:#999; font-style:italic; }
  `]
})
export class DashboardComponent implements OnInit {
  private mealSvc = inject(MealLogService);
  auth = inject(AuthService);
  username$ = this.auth.currentUser$;

  today = new Date().toISOString().split('T')[0];
  mealTypes: MealType[] = ['BREAKFAST','LUNCH','DINNER','SNACK'];
  logs: MealLog[] = [];
  dailyCalories = 0;
  macros = { protein: 0, carbs: 0, fat: 0 };

  ngOnInit() { this.loadData(); }

  loadData() {
    this.mealSvc.getDailyLog(this.today).subscribe(logs => {
      this.logs = logs;
      this.dailyCalories = logs.reduce((s, l) => s + (l.totalCalories ?? 0), 0);
      this.macros = {
        protein: logs.reduce((s, l) => s + (l.totalProtein ?? 0), 0),
        carbs:   logs.reduce((s, l) => s + (l.totalCarbs ?? 0), 0),
        fat:     logs.reduce((s, l) => s + (l.totalFat ?? 0), 0)
      };
    });
  }

  getByType(type: MealType) { return this.logs.filter(l => l.mealType === type); }

  delete(id: number) {
    this.mealSvc.delete(id).subscribe(() => this.loadData());
  }
}
