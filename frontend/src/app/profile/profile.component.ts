import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  dailyCalorieGoal: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  calorieGoal: number = 2000;
  loading = true;
  saving = false;
  successMessage = '';
  errorMessage = '';

  private apiUrl = 'http://localhost:8080/api/users/profile';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.http.get<UserProfile>(this.apiUrl).subscribe({
      next: (data) => {
        this.profile = data;
        this.calorieGoal = data.dailyCalorieGoal;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile.';
        this.loading = false;
      }
    });
  }

  saveGoal(): void {
    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.put<UserProfile>(this.apiUrl, { dailyCalorieGoal: this.calorieGoal }).subscribe({
      next: (data) => {
        this.profile = data;
        this.successMessage = 'Calorie goal updated successfully.';
        this.saving = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update calorie goal.';
        this.saving = false;
      }
    });
  }
}
