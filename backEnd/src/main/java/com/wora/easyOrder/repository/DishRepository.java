package com.wora.easyOrder.repository;


import com.wora.easyOrder.entity.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
    List<Dish> findByCategory_Id(Long categoryId);
    List<Dish> findByCategory_Name(String categoryName);
}

