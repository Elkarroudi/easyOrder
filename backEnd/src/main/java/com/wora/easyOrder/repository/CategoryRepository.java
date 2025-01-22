package com.wora.easyOrder.repository;

import com.wora.easyOrder.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
