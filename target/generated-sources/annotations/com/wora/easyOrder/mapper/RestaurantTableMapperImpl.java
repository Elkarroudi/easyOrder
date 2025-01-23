package com.wora.easyOrder.mapper;

import com.wora.easyOrder.dto.restaurantTable.CreateRestaurantTableDTO;
import com.wora.easyOrder.dto.restaurantTable.UpdateRestaurantTableDTO;
import com.wora.easyOrder.entity.RestaurantTable;
import com.wora.easyOrder.enums.TableStatus;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-22T17:14:37+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class RestaurantTableMapperImpl implements RestaurantTableMapper {

    @Override
    public RestaurantTable toEntity(CreateRestaurantTableDTO dto) {
        if ( dto == null ) {
            return null;
        }

        RestaurantTable restaurantTable = new RestaurantTable();

        restaurantTable.setNumber( dto.number() );
        restaurantTable.setCapacity( dto.capacity() );
        restaurantTable.setLocation( dto.location() );

        restaurantTable.setStatus( TableStatus.AVAILABLE );

        setDefaults( restaurantTable );

        return restaurantTable;
    }

    @Override
    public void updateEntityFromDto(UpdateRestaurantTableDTO dto, RestaurantTable entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.number() != null ) {
            entity.setNumber( dto.number() );
        }
        if ( dto.capacity() != null ) {
            entity.setCapacity( dto.capacity() );
        }
        if ( dto.location() != null ) {
            entity.setLocation( dto.location() );
        }

        setDefaults( entity );
    }
}
