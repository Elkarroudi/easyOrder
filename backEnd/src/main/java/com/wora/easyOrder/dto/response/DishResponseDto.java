package com.wora.easyOrder.dto.response;

import lombok.Data;

@Data
public class DishResponseDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;
    private Boolean available;
    private String categoryName;
}

