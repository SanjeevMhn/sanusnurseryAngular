import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private $categories = new BehaviorSubject<any[]>([]);
  latestCategories = this.$categories.asObservable();

  constructor(private http: HttpClient) { }

  updatedCategories(categories:any[]) {
    this.$categories.next(categories);
  }

  getCategories():Observable<object>{
    return this.http.get(environment.categoriesUrl)
  }


}
