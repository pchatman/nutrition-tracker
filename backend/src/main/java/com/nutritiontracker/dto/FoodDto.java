package com.nutritiontracker.dto;

import lombok.Data;

@Data
public class FoodDto {
    private Long id;
    private String name;
    private String brand;
    private Double calories;
    private Double protein;
    private Double carbohydrates;
    private Double fat;
    private Double fiber;
    private Double sugar;
    private Double sodium;
    private String servingSize;
    private Double servingCalories;
}