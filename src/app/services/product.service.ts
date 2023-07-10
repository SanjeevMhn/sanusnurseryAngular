import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, take, map, filter, BehaviorSubject, of, reduce, flatMap } from 'rxjs';
import { Product } from '../interface/product';
import { environment } from 'src/environments/environment';

// const baseUrl = './assets/json/plants.json';
const baseUrl = 'https://script.google.com/macros/s/AKfycbyqUmK7xsS47nGiPj3ErkiQ_y4ktMDjDIqbkiXpeh0jF0AuoAyNnDQ0gV-3CyebXgPJ1A/exec';
const baseUrlNew = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private $productCache = new BehaviorSubject<Product[]>([]);


  constructor(private http: HttpClient) { }

  getPlantsFromApi(): Observable<Object> {
    return this.http.get(baseUrlNew);
  }

  getAllPlants(page: number,pageSize?: number): Observable<object> {
    return this.http.get(`${baseUrlNew}?page=${page}&pageSize=${pageSize}`);
  }

  getPlants(page: number): Observable<object> {
    return this.http.get(`${baseUrlNew}?page=${page}`);
  }

  getPlantFromId(id: number): Observable<Product> {
    return this.http.get<Product>(`${baseUrlNew}/id/${id}`);
  }

  getPlantFromType(category: string, id?: number): Observable<Object> {
    return this.http.get(`${baseUrlNew}/category/${category}?prod_id=${id}`);
  }

  getPlantCategories():Observable<object>{
    return this.http.get(`${baseUrlNew}/categories`);
  }

  searchPlants(searchText: string): Observable<object> {
    return this.http.get(`${baseUrlNew}/name?prod_name=${searchText}`);
  }
}