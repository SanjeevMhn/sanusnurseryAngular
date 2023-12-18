import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faClose, faSearch, faUserCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { isObjectEmpty } from 'src/app/utils/functions/isObjectEmpty';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export default class LayoutComponent implements OnInit {

  showSideNav: boolean = false;
  showSearch: boolean = false;
  showLogin: boolean = false;
  showConfirm: boolean = false;

  faClose = faClose;
  faSearch = faSearch;
  faCircleUser = faUserCircle;
  faChevronDown = faChevronDown;

  defaultLinkActive: boolean = false;
  public showContactUs: boolean = true;
  showNavbar: boolean = true;
  previousScrollPosition: number = window.pageYOffset;
  navbarTop: boolean = false;

  searchForm!: FormGroup;
  private searchSubject = new Subject<string>();
  searchResults?: Product[];

  userData?: any;
  showDropDown: boolean = false;

  confirmationValue?: boolean;
  userData$?: Observable<any>;


  @ViewChild('searchText') searchText?: ElementRef<HTMLInputElement>;



  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private product: ProductService,
    private http: HttpClient,
    private loginService: LoginService,
    private authService: AuthService,
    private toastService: ToastService,) {

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // }
    this.userData$ = this.authService.getUserData();
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentPosition = window.pageYOffset;
    this.navbarTop = currentPosition > 5;
    this.showNavbar = currentPosition < this.previousScrollPosition || currentPosition < 72;
    this.previousScrollPosition = currentPosition;
  }

  checkObject(obj: Object): boolean {
    return isObjectEmpty(obj);
  }


  ngOnInit(): void {
    this.userData$ = this.authService.getUserData();
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((searchText: string) => {
      this.product.searchPlants(searchText).subscribe({
        next: (data: any) => {
          this.searchResults = data.products;
        },
        error: (err) => {
          console.error(err);
        }
      });
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

  toggleSideNav(value: boolean) {
    this.showSideNav = value;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.searchForm.controls['searchText'].reset('');
    this.searchResults = [];

    setTimeout(() => {
      this.searchText?.nativeElement.focus()
    }, 0)
  }

  toggleLogin(value: boolean) {
    this.showLogin = value;
  }

  showLoginModal() {
    this.loginService.show('Login');
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  toggleConfirm(value: boolean) {
    this.showConfirm = value;
  }



  logout() {
    this.authService.logout()
  }

}
