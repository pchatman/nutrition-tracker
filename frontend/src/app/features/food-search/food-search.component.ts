import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule }       from '@angular/material/card';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatSelectModule }     from '@angular/material/select';
import { MatListModule }       from '@angular/material/list';
import { FoodService }         from '../../core/services/food.service';
import { MealLogService }      from '../../core/services/meal-log.service';
import { Food }                from '../../core/models/food.model';
import { MealType }            from '../../core/models/meal-log.model';

@Component({
  selector: 'app-food-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule, MatListModule],
  template: `
    <div class="search-page">
      <h2>Search & Log Food</h2>

      <!-- Search box -->
      <mat-form-field appearance="outline">
        <mat-label>Search food...</mat-label>
        <input matInput [(ngModel)]="query" (keyup.enter)="search()">
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="search()">Search</button>

      <!-- Results -->
      <mat-card *ngFor="let food of results" class="food-card"
                [class.selected]="selectedFood?.id === food.id"
                (click)="selectFood(food)">
        <mat-card-title>{{ food.name }}</mat-card-title>
        <mat-card-subtitle>{{ food.brand }}</mat-card-subtitle>
        <div class="macros">
          <span>🔥 {{ food.calories }} kcal</span>
          <span>P: {{ food.protein }}g</span>
          <span>C: {{ food.carbohydrates }}g</span>
          <span>F: {{ food.fat }}g</span>
        </div>
      </mat-card>

      <!-- Log form -->
      <mat-card *ngIf="selectedFood" class="log-form">
        <mat-card-title>Log: {{ selectedFood.name }}</mat-card-title>
        <form [formGroup]="logForm" (ngSubmit)="logMeal()">
          <mat-form-field appearance="outline">
            <mat-label>Meal Type</mat-label>
            <mat-select formControlName="mealType">
              <mat-option *ngFor="let t of mealTypes" [value]="t">{{ t }}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Servings (grams)</mat-label>
            <input matInput type="number" formControlName="servings">
          </mat-form-field>
          <button mat-raised-button color="accent" type="submit"
                  [disabled]="logForm.invalid">Log Food</button>
        </form>
      </mat-card>
    </div>`,
  styles: [`
    .search-page { padding:24px; max-width:800px; margin:0 auto; }
    mat-form-field { width:300px; margin-right:12px; }
    .food-card { margin:8px 0; cursor:pointer; padding:12px; }
    .food-card.selected { border:2px solid #388e3c; }
    .macros { display:flex; gap:16px; margin-top:8px; font-size:13px; }
    .log-form { margin-top:24px; padding:16px; }
    .log-form form { display:flex; gap:12px; align-items:center; margin-top:12px; }
  `]
})
export class FoodSearchComponent {
  private foodSvc    = inject(FoodService);
  private mealLogSvc = inject(MealLogService);
  private router     = inject(Router);
  private fb         = inject(FormBuilder);

  query        = '';
  results: Food[] = [];
  selectedFood: Food | null = null;
  mealTypes: MealType[] = ['BREAKFAST','LUNCH','DINNER','SNACK'];

  logForm = this.fb.group({
    mealType: ['BREAKFAST' as MealType, Validators.required],
    servings: [100, [Validators.required, Validators.min(1)]]
  });

  search() {
    if (!this.query.trim()) return;
    this.foodSvc.search(this.query).subscribe(r => this.results = r);
  }

  selectFood(food: Food) { this.selectedFood = food; }

  logMeal() {
    if (!this.selectedFood || this.logForm.invalid) return;
    this.mealLogSvc.logMeal({
      foodId:   this.selectedFood.id!,
      mealType: this.logForm.value.mealType!,
      servings: this.logForm.value.servings!,
      logDate:  new Date().toISOString().split('T')[0]
    }).subscribe(() => this.router.navigate(['/dashboard']));
  }
}
