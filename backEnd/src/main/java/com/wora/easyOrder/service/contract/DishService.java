package com.wora.easyOrder.service.contract;


import com.wora.easyOrder.dto.response.DishResponseDto;
import java.util.List;
import com.wora.easyOrder.dto.request.DishRequestDto;
import com.wora.easyOrder.entity.Dish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DishService {
    DishResponseDto save(DishRequestDto dishRequestDto);
    DishResponseDto getByid(Long id);
    Page<DishResponseDto> getAll(Pageable pageable);

    DishResponseDto update(Long id, DishRequestDto dishRequestDto);
    void delete(Long id);
}


