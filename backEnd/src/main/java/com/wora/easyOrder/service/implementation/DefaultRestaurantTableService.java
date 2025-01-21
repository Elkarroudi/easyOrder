package com.wora.easyOrder.service.implementation;

import com.wora.easyOrder.dto.restaurantTable.CreateRestaurantTableDTO;
import com.wora.easyOrder.dto.restaurantTable.UpdateRestaurantTableDTO;
import com.wora.easyOrder.entity.RestaurantTable;
import com.wora.easyOrder.mapper.RestaurantTableMapper;
import com.wora.easyOrder.repository.RestaurantTableRepository;
import com.wora.easyOrder.service.RestaurantTableService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DefaultRestaurantTableService implements RestaurantTableService {
    private final RestaurantTableRepository repository;
    private final RestaurantTableMapper mapper;

    @Override
    @Transactional
    public RestaurantTable create(CreateRestaurantTableDTO request) {
        log.debug("Creating restaurant table with request: {}", request);

        RestaurantTable entity = mapper.toEntity(request);
        log.debug("Mapped entity before save: {}", entity);

        RestaurantTable savedEntity = repository.save(entity);
        log.debug("Saved entity: {}", savedEntity);

        return savedEntity;
    }
    @Override
    public Optional<RestaurantTable> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<RestaurantTable> findAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public RestaurantTable update(Long id, UpdateRestaurantTableDTO request) {
        RestaurantTable entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant table not found with id: " + id));

        mapper.updateEntityFromDto(request, entity);
        return repository.save(entity);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Restaurant table not found with id: " + id);
        }
        repository.deleteById(id);
    }
}

