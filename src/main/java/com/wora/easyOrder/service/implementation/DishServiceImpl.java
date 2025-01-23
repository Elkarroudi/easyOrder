package com.wora.easyOrder.service.implementation;

import com.wora.easyOrder.dto.request.DishRequestDto;
import com.wora.easyOrder.dto.response.DishResponseDto;
import com.wora.easyOrder.entity.Category;
import com.wora.easyOrder.entity.Dish;
import com.wora.easyOrder.mapper.DishMapper;
import com.wora.easyOrder.repository.CategoryRepository;
import com.wora.easyOrder.repository.DishRepository;
import com.wora.easyOrder.service.DishService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DishServiceImpl implements DishService {
    private final DishRepository dishRepository;
    private final CategoryRepository categoryRepository;
    private final DishMapper dishMapper;



    @Override
    public DishResponseDto save(DishRequestDto dishRequestDto) {
        Category category = categoryRepository.findById(dishRequestDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + dishRequestDto.getCategoryId()));
        Dish dish = dishMapper.toEntity(dishRequestDto);
        dish.setCategory(category);
        Dish savedDish = dishRepository.save(dish);
        return dishMapper.toDto(savedDish);
    }

    @Override
    public DishResponseDto getByid(Long id) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));
        return dishMapper.toDto(dish);
    }

    @Override
    public List<DishResponseDto> getAll() {
        return dishRepository.findAll().stream()
                .map(dishMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public DishResponseDto update(Long id, DishRequestDto dishRequestDto) {
        Dish existingDish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));

        Category category = categoryRepository.findById(dishRequestDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + dishRequestDto.getCategoryId()));

        existingDish.setName(dishRequestDto.getName());
        existingDish.setDescription(dishRequestDto.getDescription());
        existingDish.setPrice(dishRequestDto.getPrice());
        existingDish.setImage(dishRequestDto.getImage());
        existingDish.setAvailable(dishRequestDto.getAvailable());
        existingDish.setCategory(category);

        Dish updatedDish = dishRepository.save(existingDish);
        return dishMapper.toDto(updatedDish);
    }

    @Override
    public void delete(Long id) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));
        dishRepository.delete(dish);
    }
}
