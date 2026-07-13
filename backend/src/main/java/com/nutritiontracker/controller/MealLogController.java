package com.nutritiontracker.controller;

import com.nutritiontracker.dto.MealLogDto;
import com.nutritiontracker.repository.UserRepository;
import com.nutritiontracker.service.MealLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/meal-logs")
@RequiredArgsConstructor
public class MealLogController {

    private final MealLogService mealLogService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<MealLogDto> logMeal(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody MealLogDto dto) {
        Long userId = getUserId(userDetails);
        return ResponseEntity.ok(mealLogService.logMeal(userId, dto));
    }

    @GetMapping("/daily")
    public ResponseEntity<List<MealLogDto>> getDailyLog(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Long userId = getUserId(userDetails);
        return ResponseEntity.ok(mealLogService.getDailyLog(userId, date));
    }

    @GetMapping("/calories")
    public ResponseEntity<Map<String, Double>> getDailyCalories(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Long userId = getUserId(userDetails);
        Double cals = mealLogService.getDailyCalories(userId, date);
        return ResponseEntity.ok(Map.of("totalCalories", cals));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mealLogService.deleteMealLog(id);
        return ResponseEntity.noContent().build();
    }

    private Long getUserId(UserDetails userDetails) {
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found")).getId();
    }
}
