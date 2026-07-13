package com.nutritiontracker.dto;

import com.nutritiontracker.entity.MealLog.MealType;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class MealLogDto {
    private Long id;
    private Long foodId;
    private String foodName;
    private MealType mealType;
    private Double servings;
    private Double totalCalories;
    private Double totalProtein;
    private Double totalCarbs;
    private Double totalFat;
    private LocalDate logDate;
    private LocalTime logTime;
}