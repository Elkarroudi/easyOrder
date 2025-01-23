package com.wora.easyOrder.controller;

import com.wora.easyOrder.dto.ApiResponseDTO;
import com.wora.easyOrder.dto.restaurantTable.CreateRestaurantTableDTO;
import com.wora.easyOrder.dto.restaurantTable.UpdateRestaurantTableDTO;
import com.wora.easyOrder.entity.RestaurantTable;
import com.wora.easyOrder.service.RestaurantTableService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurant-tables")
@RequiredArgsConstructor
public class RestaurantTableController {
    private final RestaurantTableService service;

    @PostMapping
    public ResponseEntity<ApiResponseDTO<RestaurantTable>> createTable(
            @Valid @RequestBody CreateRestaurantTableDTO request) {
        RestaurantTable response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<RestaurantTable>> getTable(@PathVariable Long id) {
        return service.findById(id)
                .map(table -> ResponseEntity.ok(ApiResponseDTO.success(table)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponseDTO.error("Table not found", "NOT_FOUND", 404)));
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<RestaurantTable>>> getAllTables() {
        List<RestaurantTable> tables = service.findAll();
        return ResponseEntity.ok(ApiResponseDTO.success(tables, tables.size()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<RestaurantTable>> updateTable(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRestaurantTableDTO request) {
        try {
            RestaurantTable response = service.update(id, request);
            return ResponseEntity.ok(ApiResponseDTO.success(response));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponseDTO.error("Table not found", "NOT_FOUND", 404));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> deleteTable(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.ok(ApiResponseDTO.success(null));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponseDTO.error("Table not found", "NOT_FOUND", 404));
        }
    }
}