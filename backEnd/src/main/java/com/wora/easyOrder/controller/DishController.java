package com.wora.easyOrder.controller;

import com.wora.easyOrder.dto.request.DishRequestDto;
import com.wora.easyOrder.dto.response.DishResponseDto;
import com.wora.easyOrder.service.contract.DishService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dishes")
@RequiredArgsConstructor
public class DishController {

    private final DishService dishService;

    @PostMapping
    public ResponseEntity<DishResponseDto> createDish(@RequestBody DishRequestDto dishRequestDto) {
        DishResponseDto createdDish = dishService.save(dishRequestDto);
        return ResponseEntity.ok(createdDish);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DishResponseDto> getDishById(@PathVariable Long id) {
        DishResponseDto dish = dishService.getByid(id);
        return ResponseEntity.ok(dish);
    }


    @GetMapping
    public ResponseEntity<List<DishResponseDto>> getAllDishes() {
        List<DishResponseDto> dishes = dishService.getAll();
        return ResponseEntity.ok(dishes);
    }


    @PutMapping("/{id}")
    public ResponseEntity<DishResponseDto> updateDish(
            @PathVariable Long id,
            @RequestBody DishRequestDto dishRequestDto) {
        DishResponseDto updatedDish = dishService.update(id, dishRequestDto);
        return ResponseEntity.ok(updatedDish);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDish(@PathVariable Long id) {
        dishService.delete(id);
        return ResponseEntity.ok("Dish with ID " + id + " was deleted successfully.");
    }
}
