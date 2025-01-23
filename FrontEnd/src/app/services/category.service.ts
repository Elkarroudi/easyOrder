import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoryResponseDTO {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8085/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryResponseDTO[]> {
    return this.http.get<CategoryResponseDTO[]>(this.apiUrl);
  }
}
