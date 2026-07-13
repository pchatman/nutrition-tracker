export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

export interface MealLog {
  id?: number;
  foodId: number;
  foodName?: string;
  mealType: MealType;
  servings: number;
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;
  logDate: string;   // yyyy-MM-dd
  logTime?: string;
}
