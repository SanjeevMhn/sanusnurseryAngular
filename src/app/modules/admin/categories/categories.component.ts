import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories?:any[];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories():void{
    this.http.get(environment.categoriesUrl)
      .pipe(retry(3))
      .subscribe({
        next: (data:any) => {
          this.categories = data.categories;
        },
        error: (err: any) => {
          console.error(err);
        }
      })
  }

}
