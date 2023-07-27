import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/interface/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, debounceTime, pipe } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

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
  @Output() searchTextEvent = new EventEmitter<string>();

  private searchTableSubject = new Subject<string>();


  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSearch = faSearch;

  pageSizeFilterForm!: FormGroup;
  searchProductListForm!: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.pageSizeFilterForm = this.fb.group({
      sortPageSize: ["6"]
    })

    this.searchProductListForm = this.fb.group({
      searchProductListText: ['']
    })

    this.searchTableSubject
      .pipe(debounceTime(800))
      .subscribe((searchText: string) => {
        this.searchTextEvent.emit(searchText);
      })
  }

  searchProduct(event:any){
    this.searchTableSubject.next(String(event.target.value));
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
