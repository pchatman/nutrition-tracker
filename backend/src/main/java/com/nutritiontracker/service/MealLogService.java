package com.nutritiontracker.service;

import com.nutritiontracker.dto.MealLogDto;
import com.nutritiontracker.entity.*;
import com.nutritiontracker.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MealLogService {

    private final MealLogRepository mealLogRepository;
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;

    public MealLogDto logMeal(Long userId, MealLogDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Food food = foodRepository.findById(dto.getFoodId())
                .orElseThrow(() -> new RuntimeException("Food not found"));

        MealLog log = MealLog.builder()
                .user(user).food(food)
                .mealType(dto.getMealType())
                .servings(dto.getServings())
                .logDate(dto.getLogDate() != null ? dto.getLogDate() : LocalDate.now())
                .logTime(LocalTime.now())
                .build();

        return toDto(mealLogRepository.save(log));
    }

    public List<MealLogDto> getDailyLog(Long userId, LocalDate date) {
        return mealLogRepository.findByUserIdAndLogDate(userId, date)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public Double getDailyCalories(Long userId, LocalDate date) {
        Double cals = mealLogRepository.sumCaloriesByUserAndDate(userId, date);
        return cals != null ? cals : 0.0;
    }

    public void deleteMealLog(Long logId) {
        mealLogRepository.deleteById(logId);
    }

    private MealLogDto toDto(MealLog log) {
        MealLogDto dto = new MealLogDto();
        dto.setId(log.getId());
        dto.setFoodId(log.getFood().getId());
        dto.setFoodName(log.getFood().getName());
        dto.setMealType(log.getMealType());
        dto.setServings(log.getServings());
        dto.setLogDate(log.getLogDate());
        dto.setLogTime(log.getLogTime());

        double factor = log.getServings() / 100.0;
        dto.setTotalCalories(round(log.getFood().getCalories() * factor));
        dto.setTotalProtein(round(log.getFood().getProtein() * factor));
        dto.setTotalCarbs(round(log.getFood().getCarbohydrates() * factor));
        dto.setTotalFat(round(log.getFood().getFat() * factor));
        return dto;
    }

    private double round(Double value) {
        if (value == null) return 0;
        return Math.round(value * 10.0) / 10.0;
    }
}