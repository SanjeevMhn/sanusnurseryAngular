import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, take, map, filter } from 'rxjs';
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
      map(x => x.slice(0,limit))
    );
  }

  getPlantFromId(id: number): Observable<Product[]>{
    return this.http.get<Product[]>('/assets/json/plants.json').pipe(
      map(x => x.filter(x => x.id === id))
    )
  }

  getPlantFromType(type: string, id?: number): Observable<Product[]>{
    return this.http.get<Product[]>('/assets/json/plants.json').pipe(
      map(x => x.filter(x => x.type === type)),
      map(x => x.filter(x => x.id !== id))
    )
  }



}