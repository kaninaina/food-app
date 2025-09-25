import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Menu {
  private baseUrl = 'https://mocki.io/v1/b041a74f-2bf2-44b3-b9ac-407e0c8f4de6';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }
}

type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isVegetarian: boolean;
  addoncat?: any; // optional – check if present, then show "Customizations available"
};

type Category = {
  id: number;
  name: string;
  dishes: Dish[];
};

type ApiResponse = {
  categories: Category[];
};
