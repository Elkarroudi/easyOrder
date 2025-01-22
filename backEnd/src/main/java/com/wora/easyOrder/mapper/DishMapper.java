package com.wora.easyOrder.mapper;


import com.wora.easyOrder.dto.request.DishRequestDto;
import com.wora.easyOrder.dto.response.DishResponseDto;
import com.wora.easyOrder.entity.Dish;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DishMapper {
    Dish toEntity(DishRequestDto dishRequestDto);

    @Mapping(source = "category.name", target = "categoryName")
    DishResponseDto toDto(Dish dish);
}
