import { Component, HostListener, OnInit } from '@angular/core';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { debounceTime, filter } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showSideNav: boolean = false;
  showSearch: boolean = false;
  faClose = faClose;
  faSearch = faSearch;
  defaultLinkActive: boolean = false;
  public showContactUs: boolean = true;
  showNavbar: boolean = true;
  previousScrollPosition:number = window.pageYOffset;
  navbarTop: boolean = false;

  searchForm!: FormGroup;
  private searchSubject = new Subject<string>();
  searchResults?: Product[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private product: ProductService) { }


  @HostListener('window:scroll',['$event']) 
    onWindowScroll(){
      const currentPosition = window.pageYOffset;
      this.navbarTop = currentPosition > 45;
      this.showNavbar = currentPosition < this.previousScrollPosition || currentPosition < 72;
      this.previousScrollPosition = currentPosition;
    }


  ngOnInit(): void {

    this.searchSubject.pipe(
      debounceTime(800)
    ).subscribe((searchText: string) => {
      this.searchResults = this.product.searchPlants(searchText);
      // console.log(this.searchResults);
    })

    this.searchForm = this.fb.group({
      searchText: ['']
    })
    this.onRouteChanges();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.onRouteChanges();
    })
  }

  onRouteChanges() {
    const currentUrl = this.router.url;
    if (currentUrl !== '/home') {
      this.defaultLinkActive = false;
      this.showContactUs = false;
    } else {
      this.defaultLinkActive = true;
      this.showContactUs = true;
    }
  }

  search(event: any) {
    if (event.target.value !== '' || event.target.value === null) {
      this.searchSubject.next(event.target.value)
      // console.log(event.target.value);
    }
  }

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.searchForm.controls['searchText'].reset('');
    this.searchResults = [];
  }

}
