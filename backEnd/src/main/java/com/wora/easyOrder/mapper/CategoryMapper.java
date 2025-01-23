package com.wora.easyOrder.mapper;

import com.wora.easyOrder.dto.request.CategoryRequestDTO;
import com.wora.easyOrder.dto.response.CategoryResponseDTO;
import com.wora.easyOrder.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "dishes", source = "dishes")
    CategoryResponseDTO toDTO(Category category);

    Category toEntity(CategoryRequestDTO dto);
}
