import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CategoryResponseDTO {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8085/api/categories';

  private selectedCategorySubject = new BehaviorSubject<CategoryResponseDTO | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryResponseDTO[]> {
    return this.http.get<CategoryResponseDTO[]>(this.apiUrl);
  }

  setSelectedCategory(category: CategoryResponseDTO | null) {
    this.selectedCategorySubject.next(category);
  }
}
