package com.wora.easyOrder.service;


import com.wora.easyOrder.dto.response.DishResponseDto;
import java.util.List;
import com.wora.easyOrder.dto.request.DishRequestDto;

public interface DishService {
    DishResponseDto save(DishRequestDto dishRequestDto);
    DishResponseDto getByid(Long id);
    List<DishResponseDto> getAll();
    DishResponseDto update(Long id, DishRequestDto dishRequestDto);
    void delete(Long id);
}


