import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';
import { CategoryModalService } from '../category-modal/category-modal.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories?:any[];

  constructor(
      private router: Router, 
      private http: HttpClient, 
      private toastService: ToastService,
      private categoryModalService: CategoryModalService,
      private categoryService: CategoryService ) { }

  ngOnInit(): void {
    // this.getCategories();
    this.categoryService.latestCategories.subscribe((categories:any) => {
      this.categories = categories;
    })

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

  deleteCategory(event:number){
    let cat_id = event;
    this.http.delete(`${environment.categoriesUrl}/id/${cat_id}`).subscribe({
      next: (data: any) => {
        this.toastService.show(data.message, ToastType.success);
        this.getCategories();
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  addCategory(){
    this.categoryModalService.show("add")
  }

}
