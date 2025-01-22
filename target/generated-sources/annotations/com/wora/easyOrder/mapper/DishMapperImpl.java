package com.wora.easyOrder.mapper;

import com.wora.easyOrder.dto.request.DishRequestDto;
import com.wora.easyOrder.dto.response.DishResponseDto;
import com.wora.easyOrder.entity.Category;
import com.wora.easyOrder.entity.Dish;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-22T16:50:24+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class DishMapperImpl implements DishMapper {

    @Override
    public Dish toEntity(DishRequestDto dishRequestDto) {
        if ( dishRequestDto == null ) {
            return null;
        }

        Dish dish = new Dish();

        dish.setName( dishRequestDto.getName() );
        dish.setDescription( dishRequestDto.getDescription() );
        dish.setPrice( dishRequestDto.getPrice() );
        dish.setImage( dishRequestDto.getImage() );
        dish.setAvailable( dishRequestDto.getAvailable() );

        return dish;
    }

    @Override
    public DishResponseDto toDto(Dish dish) {
        if ( dish == null ) {
            return null;
        }

        DishResponseDto dishResponseDto = new DishResponseDto();

        dishResponseDto.setCategoryName( dishCategoryName( dish ) );
        dishResponseDto.setId( dish.getId() );
        dishResponseDto.setName( dish.getName() );
        dishResponseDto.setDescription( dish.getDescription() );
        dishResponseDto.setPrice( dish.getPrice() );
        dishResponseDto.setImage( dish.getImage() );
        dishResponseDto.setAvailable( dish.getAvailable() );

        return dishResponseDto;
    }

    private String dishCategoryName(Dish dish) {
        if ( dish == null ) {
            return null;
        }
        Category category = dish.getCategory();
        if ( category == null ) {
            return null;
        }
        String name = category.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }
}
