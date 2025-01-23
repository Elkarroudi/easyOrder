package com.wora.easyOrder.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

public interface GenericMapper<T, REQ, RES> {

    T toEntity(REQ req);

    RES toResponseDTO(T entity);

    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "id", ignore = true)
    void updateEntity(REQ dto, @MappingTarget T entity);

}
