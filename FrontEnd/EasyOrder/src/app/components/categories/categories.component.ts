import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoryResponseDTO, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: CategoryResponseDTO[] = [];
  selectedCategory: CategoryResponseDTO | null = null;
  private categorySubscription?: Subscription;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.categorySubscription = this.categoryService.selectedCategory$
      .subscribe(category => {
        this.selectedCategory = category;
      });
  }

  ngOnDestroy() {
    this.categorySubscription?.unsubscribe();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  filterDishes(category: CategoryResponseDTO | null) {
    this.categoryService.setSelectedCategory(category);
  }
}
