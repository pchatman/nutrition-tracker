export interface LoginRequest  { username: string; password: string; }
export interface RegisterRequest {
  username: string; email: string;
  password: string; dailyCalorieGoal?: number;
}
export interface AuthResponse  { token: string; username: string; }
