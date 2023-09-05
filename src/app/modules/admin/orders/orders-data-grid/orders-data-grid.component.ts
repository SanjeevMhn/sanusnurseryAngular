import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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
  @Output() searchDateEvent = new EventEmitter<string>();
  @Output() searchByUserNameEvent = new EventEmitter<string>()


  pageSizeFilterForm!: FormGroup;

  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faAnglesRight = faAnglesRight;
  faChevronRight = faChevronRight;

  private userNameSubject = new Subject<string>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageSizeFilterForm = this.fb.group({
      sortPageSize: ["10"]
    })

    this.userNameSubject
      .pipe(debounceTime(1000),
        distinctUntilChanged())
      .subscribe((searchText: string) => {
        this.searchByUserNameEvent.emit(searchText)
      });
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

  searchByDate(event: any){
    this.searchDateEvent.emit(String(event.target.value));
  }

  searchByUserName(event: any){
    this.userNameSubject.next(event.target.value);
  }
}
