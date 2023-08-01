import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders-data-grid',
  templateUrl: './orders-data-grid.component.html',
  styleUrls: ['./orders-data-grid.component.scss']
})
export class OrdersDataGridComponent implements OnInit {

  @Input() orderList?: any[];
  @Input() currentPage?: number;
  @Input() totalPages?: number;
  @Input() totalItems?: number;

  @Output() nextPageEvent = new EventEmitter<number>();
  @Output() prevPageEvent = new EventEmitter<number>();
  @Output() changePageSizeEvent = new EventEmitter<number>();
  @Output() firstPageEvent = new EventEmitter<number>();
  @Output() lastPageEvent = new EventEmitter<number>();


  pageSizeFilterForm!: FormGroup;

  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faAnglesRight = faAnglesRight;
  faChevronRight = faChevronRight;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageSizeFilterForm = this.fb.group({
      sortPageSize: ["10"]
    })
  }
  changePageSize(event: any) {
    this.changePageSizeEvent.emit(Number(event.target.value))
  }

  nextPage() {
    if (this.currentPage! < this.totalPages!) {
      this.nextPageEvent.emit(this.currentPage! + 1);
    }
  }

  prevPage() {
    if (this.currentPage! > 1) {
      this.prevPageEvent.emit(this.currentPage! - 1);
    }
  }

  firstPage() {
    if (this.currentPage! > 1) {
      this.firstPageEvent.emit(1);
    }
  }

  lastPage() {
    if (this.currentPage! < this.totalPages!) {
      this.lastPageEvent.emit(this.totalPages);
    }
  }
}
