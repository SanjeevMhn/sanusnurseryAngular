import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ToastType } from 'src/app/modules/shared/toast/toast.modal';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { CategoryModalService } from '../../category-modal/category-modal.service';

@Component({
  selector: 'app-category-data-grid-row',
  templateUrl: './category-data-grid-row.component.html',
  styleUrls: ['./category-data-grid-row.component.scss']
})
export class CategoryDataGridRowComponent implements OnInit {

  constructor(private http: HttpClient, private toastService: ToastService, private categoryModalService: CategoryModalService) { }

  @Input() i?:number;
  @Input() item: any;


  @Output() deleteProductEvent = new EventEmitter<number>();

  faEllipsis = faEllipsis;

  showDropdown: boolean = false;

  ngOnInit(): void {
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  deleteCategory(cat_id:number){
    this.showDropdown = false;
    if(window.confirm("Are you sure you want to delete this?")){
      this.deleteProductEvent.emit(cat_id);
    }
  }

  toggleCategoryModal(){
    this.showDropdown = false;
    this.categoryModalService.show('edit');
  }

}
