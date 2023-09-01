import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModal } from './category-modal';

@Injectable({
  providedIn: 'root'
})
export class CategoryModalService {

  $categoryModalState = new BehaviorSubject<CategoryModal>(new CategoryModal(false));
  $categoryModalMode = new BehaviorSubject<string>('');
  $categoryModalEditData = new BehaviorSubject<any>({});

  latestModalMode = this.$categoryModalMode.asObservable();
  editCategoryData = this.$categoryModalEditData.asObservable();

  // editId?:number;

  constructor(private http: HttpClient) { }

  public show(mode: string, id?: number){
    let categoryModal = new CategoryModal(true);
    this.$categoryModalMode.next(mode);
    if(id){
      // this.editId = id;
      // this.$categoryModalId.next(id);
      this.getCategoryEditData(id);

    }

    this.$categoryModalState.next(categoryModal);
  }

  public getCategoryEditData(id:number){
    this.http.get(`${environment.categoriesUrl}/id/${id}`,{withCredentials: true}).subscribe({
      next: (data:any) => {
        this.setCategoryEditData(data.category);
      },
      error: (err:any) => {
        console.error(err)
      }
    })
  }

  public setCategoryEditData(category:any){
    this.$categoryModalEditData.next(category)
  }

  public hide(){
    this.$categoryModalState.next(new CategoryModal(false));
    this.$categoryModalMode.next('');
    this.$categoryModalEditData.next({});
  }
}
