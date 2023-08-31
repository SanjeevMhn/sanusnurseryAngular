import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryModal } from './category-modal';

@Injectable({
  providedIn: 'root'
})
export class CategoryModalService {

  $categroyModalState = new BehaviorSubject<CategoryModal>(new CategoryModal(false));

  constructor() { }

  public show(mode: string){
    let categoryModal = new CategoryModal(true);
    categoryModal.mode = mode;

    this.$categroyModalState.next(categoryModal);
  }

  public hide(){
    this.$categroyModalState.next(new CategoryModal(false));
  }
}
