package com.wora.easyOrder.mapper;

import com.wora.easyOrder.dto.request.CategoryRequestDTO;
import com.wora.easyOrder.dto.response.CategoryResponseDTO;
import com.wora.easyOrder.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    @Mapping(target = "dishes", source = "dishes")
    CategoryResponseDTO toDTO(Category category);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dishes", ignore = true)
    Category toEntity(CategoryRequestDTO dto);
}
