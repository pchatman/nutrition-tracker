package com.nutritiontracker.repository;

import com.nutritiontracker.entity.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface MealLogRepository extends JpaRepository<MealLog, Long> {
    List<MealLog> findByUserIdAndLogDate(Long userId, LocalDate logDate);
    List<MealLog> findByUserIdAndLogDateBetween(Long userId, LocalDate start, LocalDate end);

    @Query("SELECT SUM(ml.food.calories * ml.servings / 100) FROM MealLog ml WHERE ml.user.id = :userId AND ml.logDate = :date")
    Double sumCaloriesByUserAndDate(Long userId, LocalDate date);
}