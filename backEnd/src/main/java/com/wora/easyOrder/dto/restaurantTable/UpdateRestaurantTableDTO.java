package com.wora.easyOrder.dto.restaurantTable;

import jakarta.validation.constraints.*;

public record UpdateRestaurantTableDTO(
        @Positive(message = "Table number must be positive")
        Integer number,

        @Min(value = 1, message = "Capacity must be at least 1")
        Integer capacity,

        @Size(max = 100, message = "Location cannot exceed 100 characters")
        String location
) {}