package com.wora.easyOrder.service;

import com.wora.easyOrder.dto.response.DishResponseDto;
import com.wora.easyOrder.dto.request.DishRequestDto;
import java.util.List;

public interface DishService {
    DishResponseDto save(DishRequestDto dishRequestDto);
    DishResponseDto getByid(Long id);
    List<DishResponseDto> getAll();
    DishResponseDto update(Long id, DishRequestDto dishRequestDto);
    void delete(Long id);
}
