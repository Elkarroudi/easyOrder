package com.wora.easyOrder.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class CategoryResponseDTO {
    private Long id;
    private String name;
    private List<DishResponseDto> dishes;
}
