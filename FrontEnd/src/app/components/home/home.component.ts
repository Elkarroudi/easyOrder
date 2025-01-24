import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstSectionComponent } from '../first-section/first-section.component';
import { CategoriesComponent } from '../categories/categories.component';
import { FoodMenuComponent } from '../food-menu/food-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FirstSectionComponent, CategoriesComponent, FoodMenuComponent],
  template: `
    <app-first-section></app-first-section>
    <app-categories></app-categories>
    <app-food-menu></app-food-menu>
  `
})
export class HomeComponent {}
