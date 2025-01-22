package com.wora.easyOrder.mapper;

import com.wora.easyOrder.dto.request.CategoryRequestDTO;
import com.wora.easyOrder.dto.response.CategoryResponseDTO;
import com.wora.easyOrder.dto.response.DishResponseDto;
import com.wora.easyOrder.entity.Category;
import com.wora.easyOrder.entity.Dish;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-22T16:50:24+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryResponseDTO toDTO(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();

        categoryResponseDTO.setDishes( dishListToDishResponseDtoList( category.getDishes() ) );
        categoryResponseDTO.setId( category.getId() );
        categoryResponseDTO.setName( category.getName() );

        return categoryResponseDTO;
    }

    @Override
    public Category toEntity(CategoryRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Category category = new Category();

        category.setName( dto.getName() );

        return category;
    }

    protected DishResponseDto dishToDishResponseDto(Dish dish) {
        if ( dish == null ) {
            return null;
        }

        DishResponseDto dishResponseDto = new DishResponseDto();

        dishResponseDto.setId( dish.getId() );
        dishResponseDto.setName( dish.getName() );
        dishResponseDto.setDescription( dish.getDescription() );
        dishResponseDto.setPrice( dish.getPrice() );
        dishResponseDto.setImage( dish.getImage() );
        dishResponseDto.setAvailable( dish.getAvailable() );

        return dishResponseDto;
    }

    protected List<DishResponseDto> dishListToDishResponseDtoList(List<Dish> list) {
        if ( list == null ) {
            return null;
        }

        List<DishResponseDto> list1 = new ArrayList<DishResponseDto>( list.size() );
        for ( Dish dish : list ) {
            list1.add( dishToDishResponseDto( dish ) );
        }

        return list1;
    }
}
