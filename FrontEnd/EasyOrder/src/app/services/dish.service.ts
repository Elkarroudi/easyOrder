
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DishResponseDto {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  categoryName: string;
  rating: number;
  categoryId : number
}


@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:8085/api/dishes/';

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<DishResponseDto[]> {
    return this.http.get<DishResponseDto[]>(this.apiUrl);
  }
}
