import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/interface/product';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  @Input() productsList?: Product[];
  @Input() page?: number;
  @Input() pageSize?: number;
  @Input() totalPages?: number;
  @Input() totalProducts?: number;


  @Output() nextPageEvent = new EventEmitter<number>();
  @Output() prevPageEvent = new EventEmitter<number>();
  @Output() changePageSizeEvent = new EventEmitter<number>();
  @Output() firstPageEvent = new EventEmitter<number>();
  @Output() lastPageEvent = new EventEmitter<number>();


  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  pageSizeFilterForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageSizeFilterForm = this.fb.group({
      sortPageSize: ["6"]
    })
  }

  changePageSize(event:any){
    this.changePageSizeEvent.emit(Number(event.target.value))
  }

  nextPage() {
    if (this.page! < this.totalPages!) {
      this.nextPageEvent.emit(this.page! + 1);
    }
  }

  prevPage() {
    if (this.page! > 1) {
      this.prevPageEvent.emit(this.page! - 1);
    }
  }

  firstPage(){
    if(this.page! > 1){
      this.firstPageEvent.emit(1);
    }
  }

  lastPage(){
    if(this.page! < this.totalPages!){
      this.lastPageEvent.emit(this.totalPages);
    }
  }

}
