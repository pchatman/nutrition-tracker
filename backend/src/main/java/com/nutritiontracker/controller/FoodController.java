package com.nutritiontracker.controller;

import com.nutritiontracker.dto.FoodDto;
import com.nutritiontracker.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @GetMapping("/search")
    public ResponseEntity<List<FoodDto>> search(@RequestParam String query) {
        return ResponseEntity.ok(foodService.searchFoods(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(foodService.getFoodById(id));
    }

    @PostMapping
    public ResponseEntity<FoodDto> create(@RequestBody FoodDto dto) {
        return ResponseEntity.ok(foodService.createFood(dto));
    }
}