package com.wora.easyOrder.service;

import com.wora.easyOrder.dto.restaurantTable.CreateRestaurantTableDTO;
import com.wora.easyOrder.dto.restaurantTable.UpdateRestaurantTableDTO;
import com.wora.easyOrder.entity.RestaurantTable;

import java.util.List;
import java.util.Optional;

public interface RestaurantTableService {
    RestaurantTable create(CreateRestaurantTableDTO request);

    Optional<RestaurantTable> findById(Long id);

    List<RestaurantTable> findAll();

    RestaurantTable update(Long id, UpdateRestaurantTableDTO request);

    void delete(Long id);
}
