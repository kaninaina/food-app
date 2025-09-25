import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/common';

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
