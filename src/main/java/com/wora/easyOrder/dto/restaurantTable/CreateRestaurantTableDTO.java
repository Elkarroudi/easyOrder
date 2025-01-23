package com.wora.easyOrder.dto.restaurantTable;

import jakarta.validation.constraints.*;

public record CreateRestaurantTableDTO(
        @NotNull(message = "Table number cannot be null")
        @Positive(message = "Table number must be positive")
        Integer number,

        @NotNull(message = "Capacity cannot be null")
        @Min(value = 1, message = "Capacity must be at least 1")
        Integer capacity,

        @NotBlank(message = "Location cannot be blank")
        @Size(max = 100, message = "Location cannot exceed 100 characters")
        String location
) {}