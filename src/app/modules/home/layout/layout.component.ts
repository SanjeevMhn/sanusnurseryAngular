import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faClose, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { debounceTime, filter } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export default class LayoutComponent implements OnInit {

  showSideNav: boolean = false;
  showSearch: boolean = false;
  showLogin: boolean = false;

  faClose = faClose;
  faSearch = faSearch;
  faCircleUser = faUserCircle;

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

  @ViewChild('searchText') searchText?: ElementRef<HTMLInputElement>;



  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private product: ProductService,
    private http: HttpClient,
    private loginService: LoginService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.http.get(`${environment.authUrl}/me`, { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.userData = data.user[0];
      },
      error: (err: any) => {
        // this.userData = null
      }
    })
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentPosition = window.pageYOffset;
    this.navbarTop = currentPosition > 5;
    this.showNavbar = currentPosition < this.previousScrollPosition || currentPosition < 72;
    this.previousScrollPosition = currentPosition;
  }


  ngOnInit(): void {

    this.searchSubject.pipe(
      debounceTime(800)
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

    // this.authService.getAuthData().subscribe({
    //   next: (data:any) => {
    //     this.userData = data[0];
    //     console.log(data[0]);
    //   }
    // })
    this.http.get(`${environment.authUrl}/me`).subscribe({
      next: (res: any) => {
        this.userData = res.user[0];
        console.log(this.userData);
      },
      error: (err: any) => {
        console.error(err);
      }
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

    setTimeout(() => {
      this.searchText?.nativeElement.focus()
    }, 0)
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  showLoginModal() {
    this.loginService.show('Login');
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  logout() {
    this.http.post(`${environment.authUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.userData = null;
      }
    })
  }

}
