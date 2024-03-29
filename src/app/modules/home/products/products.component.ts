import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  productType?: string | null;
  products?: Product[];
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages?: number;
  sortBy: string = 'default';
  categories: string[] = ['', 'flower', 'plant', 'vegetable'];
  defaultLinkActive: boolean = true;
  listFilterItem?: Event;
  filter?: string;

  public sortForm!: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sortForm = this.fb.group({
      sortSelect: ['default']
    })
    this.productType = this.route.snapshot.paramMap.get('type')!;
    if (this.productType !== null) {
      this.defaultLinkActive = !this.defaultLinkActive;
    }
    this.getProducts(this.productType);
    this.filterData(this.filter!);
  }

  filterData(filter: string): Product[] {
    if (filter === 'priceLowToHigh') {
      return this.products!.sort((a, b) => a.price - b.price);
    } else if (filter === 'priceHighToLow') {
      return this.products!.sort((a, b) => b.price - a.price);
    } else {
      return this.products!;
    }
  }

  changeFilterData(e: any) {
    this.filterData(String(e.target.value));
  }

  getProducts(type: string): void {
    if (type !== null) {
      this.productService.getPlantFromType(type).subscribe({
        next: (data) => {
          this.products = data;
          this.totalPages = Math.ceil(this.products.length / this.pageSize);
          // console.log(this.products);
        },
        error: (err) => {
          console.error(err);
        }
      })
    } else {
      this.productService.getAllPlants().subscribe({
        next: (data) => {
          this.products = data;
          this.totalPages = Math.ceil(this.products.length / this.pageSize);
          // console.log(this.products);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products?.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages!) {
      this.currentPage++;
    }
  }

  reload(): void {
    const getType = this.route.snapshot.paramMap.get('type')!;
    this.getProducts(getType);
    this.currentPage = 1;
    this.sortForm.controls['sortSelect'].reset('default');
  }
}
