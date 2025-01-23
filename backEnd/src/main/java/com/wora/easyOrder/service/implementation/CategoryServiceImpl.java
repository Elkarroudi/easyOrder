package com.wora.easyOrder.service.implementation;

import com.wora.easyOrder.dto.request.CategoryRequestDTO;
import com.wora.easyOrder.dto.response.CategoryResponseDTO;
import com.wora.easyOrder.entity.Category;
import com.wora.easyOrder.mapper.CategoryMapper;
import com.wora.easyOrder.repository.CategoryRepository;
import com.wora.easyOrder.service.contract.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO requestDTO) {
        if (categoryRepository.existsByName(requestDTO.getName())) {
            throw new RuntimeException("Category with name " + requestDTO.getName() + " already exists");
        }

        Category category = new Category();
        category.setName(requestDTO.getName());

        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDTO(savedCategory);
    }

    @Override
    public CategoryResponseDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return categoryMapper.toDTO(category);
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO requestDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        if (!category.getName().equals(requestDTO.getName()) &&
                categoryRepository.existsByName(requestDTO.getName())) {
            throw new RuntimeException("Category with name " + requestDTO.getName() + " already exists");
        }

        category.setName(requestDTO.getName());
        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.toDTO(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
