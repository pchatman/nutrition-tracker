package com.nutritiontracker.service;

import com.nutritiontracker.dto.FoodDto;
import com.nutritiontracker.entity.Food;
import com.nutritiontracker.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;

    public List<FoodDto> searchFoods(String query) {
        return foodRepository.findByNameContainingIgnoreCase(query)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public FoodDto createFood(FoodDto dto) {
        Food food = Food.builder()
                .name(dto.getName()).brand(dto.getBrand())
                .calories(dto.getCalories()).protein(dto.getProtein())
                .carbohydrates(dto.getCarbohydrates()).fat(dto.getFat())
                .fiber(dto.getFiber()).sugar(dto.getSugar())
                .sodium(dto.getSodium()).servingSize(dto.getServingSize())
                .servingCalories(dto.getServingCalories()).build();
        return toDto(foodRepository.save(food));
    }

    public FoodDto getFoodById(Long id) {
        return foodRepository.findById(id).map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Food not found"));
    }

    private FoodDto toDto(Food food) {
        FoodDto dto = new FoodDto();
        dto.setId(food.getId());
        dto.setName(food.getName());
        dto.setBrand(food.getBrand());
        dto.setCalories(food.getCalories());
        dto.setProtein(food.getProtein());
        dto.setCarbohydrates(food.getCarbohydrates());
        dto.setFat(food.getFat());
        dto.setFiber(food.getFiber());
        dto.setSugar(food.getSugar());
        dto.setSodium(food.getSodium());
        dto.setServingSize(food.getServingSize());
        dto.setServingCalories(food.getServingCalories());
        return dto;
    }
}