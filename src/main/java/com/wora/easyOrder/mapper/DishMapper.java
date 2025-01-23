package com.wora.easyOrder.mapper;

import com.wora.easyOrder.dto.request.DishRequestDto;
import com.wora.easyOrder.dto.response.DishResponseDto;
import com.wora.easyOrder.entity.Dish;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DishMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "orderItems", ignore = true)
    Dish toEntity(DishRequestDto dishRequestDto);

    @Mapping(source = "category.name", target = "categoryName")
    DishResponseDto toDto(Dish dish);
}
