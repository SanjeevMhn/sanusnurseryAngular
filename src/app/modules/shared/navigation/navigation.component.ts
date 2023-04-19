import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch, faPhone, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faSearch = faSearch;
  faPhone = faPhone;
  faCartShopping = faCartShopping;
  faBars = faBars;

  @Output() toggleSideNav = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSideNav(){
    this.toggleSideNav.emit()
  }
}
