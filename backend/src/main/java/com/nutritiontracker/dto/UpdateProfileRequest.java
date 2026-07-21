package com.nutritiontracker.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class UpdateProfileRequest {
    @Min(value = 500, message = "Calorie goal must be at least 500")
    private Double dailyCalorieGoal;
}