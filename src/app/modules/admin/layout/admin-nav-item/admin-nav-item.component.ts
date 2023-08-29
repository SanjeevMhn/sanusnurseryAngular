import { Component, OnInit, Input } from '@angular/core';
import { faChevronDown, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { AdminSidenav } from '../layout.component';

@Component({
  selector: 'app-admin-nav-item',
  templateUrl: './admin-nav-item.component.html',
  styleUrls: ['./admin-nav-item.component.scss']
})
export class AdminNavItemComponent implements OnInit{

  @Input() item!: AdminSidenav;

  dspSubMenu: boolean = false;
  hasActiveLinks: boolean = false;

  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faCircle = faCircle;

  constructor() {}

  ngOnInit(): void {
  }

  toggleSubMenu() {
    this.dspSubMenu = !this.dspSubMenu;
  }

}
