package com.wora.easyOrder.dto.request;


import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class DishRequestDto {
    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 1000)
    private String description;

    @NotNull
    @DecimalMin("0.0")
    private Double price;

    @Size(max = 255)
    private String image;

    @NotNull
    private Boolean available;

    @NotNull
    private Long categoryId;
}
