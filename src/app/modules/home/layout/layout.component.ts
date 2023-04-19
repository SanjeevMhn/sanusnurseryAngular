import { Component, OnInit } from '@angular/core';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showSideNav: boolean = false;
  faClose = faClose;
  faSearch = faSearch;
  defaultLinkActive:boolean = true;

  constructor() { }

  ngOnInit(): void {}

  toggleSideNav(){
    this.showSideNav = !this.showSideNav;
  }

}
