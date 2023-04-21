import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, take, map, filter } from 'rxjs';
import { Product } from '../interface/product';

const baseUrl = './assets/json/plants.json';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) {

  }

  getAllPlants(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }

  getPlants(limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl).pipe(
      map(x => x.slice(0, limit))
    );
  }

  getPlantFromId(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl).pipe(
      map(x => x.filter(x => x.id === id))
    )
  }

  getPlantFromType(type: string, id?: number): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl).pipe(
      map(x => x.filter(x => x.type === type)),
      map(x => x.filter(x => x.id !== id))
    )
  }

  searchPlants(searchText: string): Product[] {

    let results: Product[] = [];
    this.http.get<Product[]>(baseUrl).forEach((obj) => {
      obj.map((obj) => {
        if(obj.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
          results.push(obj)
        }
      })
    })

    return results;
  }



}
