package com.wora.easyOrder.mapper;

import com.wora.easyOrder.dto.restaurantTable.CreateRestaurantTableDTO;
import com.wora.easyOrder.dto.restaurantTable.UpdateRestaurantTableDTO;
import com.wora.easyOrder.entity.RestaurantTable;
import com.wora.easyOrder.enums.TableStatus;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RestaurantTableMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "orders", ignore = true)
    @Mapping(target = "status", constant = "AVAILABLE")
    @Mapping(source = "number", target = "number")
    @Mapping(source = "capacity", target = "capacity")
    @Mapping(source = "location", target = "location")
    RestaurantTable toEntity(CreateRestaurantTableDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "orders", ignore = true)
    @Mapping(source = "number", target = "number")
    @Mapping(source = "capacity", target = "capacity")
    @Mapping(source = "location", target = "location")
    void updateEntityFromDto(UpdateRestaurantTableDTO dto, @MappingTarget RestaurantTable entity);

    @AfterMapping
    default void setDefaults(@MappingTarget RestaurantTable entity) {
        if (entity.getStatus() == null) {
            entity.setStatus(TableStatus.AVAILABLE);
        }
    }
}