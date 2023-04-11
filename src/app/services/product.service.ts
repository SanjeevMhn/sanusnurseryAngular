import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, take } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  getAllPlants(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/json/plants.json');
  }

  getPlants(limit: number): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/json/plants.json').pipe(
      take(limit)
    );
  }

}
