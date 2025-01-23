import {Component, OnInit} from '@angular/core';
import {CategoryResponseDTO, CategoryService} from '../../services/category.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-categories',
  imports: [
    CommonModule,
    HttpClientModule
  ],  templateUrl: './categories.component.html',
  standalone: true,
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: CategoryResponseDTO[] = [];
  selectedCategory: CategoryResponseDTO | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        console.log('Categories loaded:', categories);
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }

  filterDishes(category: CategoryResponseDTO) {
    this.selectedCategory = category;
  }
}


