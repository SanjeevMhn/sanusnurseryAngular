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


  constructor(private http: HttpClient) {

  }

  getPlantsFromApi(): Observable<Object> {
    // this.http.get<Product[]>(baseUrlNew).subscribe({
    //   next: (data) => {
    //     // sessionStorage.setItem('products', JSON.stringify(data))
    //     // this.$productCache.next([...data]);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // });
    return this.http.get(baseUrlNew);
  }

  getAllPlants(page: number): Observable<object> {
    // const cachedProductData = sessionStorage.getItem('products');
    // let plants;
    // if (cachedProductData) {
    //   if (this.$productCache.getValue().length > 0) {
    //     plants = this.$productCache
    //   } else {
    //     this.$productCache.next([...JSON.parse(cachedProductData)]);
    //     plants = this.$productCache;
    //   }

    // } else {
    //   this.getPlantsFromApi();
    //   plants = this.$productCache;
    // }
    // return plants as Observable<Product[]>;
    return this.http.get(`${baseUrlNew}?page=${page}`);
  }

  getPlants(page: number): Observable<object> {
    return this.http.get(`${baseUrlNew}?page=${page}`);
    // let cachedProductData = sessionStorage.getItem('products');
    // let plants;
    // if (cachedProductData) {
    //   if (this.$productCache.getValue().length > 0) {
    //     plants = this.$productCache.pipe(
    //       map(x => x.slice(0, limit))
    //     )
    //   } else {
    //     this.$productCache.next([...JSON.parse(cachedProductData)]);
    //     plants = this.$productCache.pipe(
    //       map(x => x.slice(0, limit))
    //     )
    //   }
    // } else {
    //   this.getPlantsFromApi()
    //   plants = this.$productCache.pipe(
    //     map(x => x.slice(0, limit))
    //   )
    // }
    // return plants as Observable<Product[]>;

  }

  getPlantFromId(id: number): Observable<Product> {
    // return this.http.get<Product[]>(baseUrl).pipe(
    //   map(x => x.filter(x => x.id === id))
    // )
    // let cachedProductData = sessionStorage.getItem('products');
    // let plant;
    // if (cachedProductData) {
    //   if (this.$productCache.getValue().length > 0) {
    //     plant = this.$productCache.pipe(
    //       map(x => x.filter(x => x.id === id)[0])
    //     )
    //   } else {
    //     this.$productCache.next([...JSON.parse(cachedProductData!)]);
    //     plant = this.$productCache.pipe(
    //       map(x => x.filter(x => x.id === id)[0])
    //     )
    //   }
    // } else {
    //   this.getPlantsFromApi();
    //   plant = this.$productCache.pipe(
    //     map(x => x.filter(x => x.id === id)[0])
    //   )
    // }


    // return plant as Observable<Product>;
    return this.http.get<Product>(`${baseUrlNew}/id/${id}`);

  }

  getPlantFromType(category: string, id?: number): Observable<Object> {
    // return this.http.get<Product[]>(baseUrl).pipe(
    //   map(x => x.filter(x => x.type === type)),
    //   map(x => x.filter(x => x.id !== id))
    // )
    // let cachedProductData = sessionStorage.getItem('products');
    // let plants;

    // if (cachedProductData) {
    //   if (this.$productCache.getValue().length > 0) {
    //     plants = this.$productCache.pipe(
    //       map(x => x.filter(x => x.type === type)),
    //       map(x => x.filter(x => x.id !== id))
    //     )
    //   } else {
    //     this.$productCache.next([...JSON.parse(cachedProductData)]);
    //     plants = this.$productCache.pipe(
    //       map(x => x.filter(x => x.type === type)),
    //       map(x => x.filter(x => x.id !== id))
    //     )
    //   }
    // } else {
    //   this.getPlantsFromApi();
    //   plants = this.$productCache.pipe(
    //     map(x => x.filter(x => x.type === type)),
    //     map(x => x.filter(x => x.id !== id))
    //   )
    // }

    return this.http.get(`${baseUrlNew}/category/${category}?prod_id=${id}`);
  }

  getPlantCategories():Observable<object>{
    return this.http.get(`${baseUrlNew}/categories`);
  }

  searchPlants(searchText: string): Observable<object> {
    return this.http.get(`${baseUrlNew}/name?prod_name=${searchText}`);
    // let results: Product[] = [];
    // let cachedProductData = sessionStorage.getItem('products');
    // if (cachedProductData) {
    //   if (this.$productCache.getValue().length > 0) {
    //     this.$productCache.forEach((obj) => {
    //       obj.map((obj) => {
    //         if (obj.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
    //           results.push(obj)
    //         }
    //       })
    //     })
    //   } else {
    //     this.$productCache.next([...JSON.parse(cachedProductData)]);
    //     this.$productCache.forEach((obj) => {
    //       obj.map((obj) => {
    //         if (obj.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
    //           results.push(obj)
    //         }
    //       })
    //     })
    //   }
    // } else {
    //   this.getPlantsFromApi();
    //   this.$productCache.forEach((obj) => {
    //     obj.map((obj) => {
    //       if (obj.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
    //         results.push(obj)
    //       }
    //     })
    //   })
    // }

    // return results;
  }
}