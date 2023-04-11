import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  getAllPlants(): Observable<any[]> {
    return this.http.get<any[]>('/assets/json/plants.json');
  }

  getPlants(limit: number): Observable<any[]> {
    return this.http.get<any[]>('/assets/json/plants.json').pipe(
      take(limit)
    );
  }

}
