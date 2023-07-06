import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  sidenavList: string[] = [
    "dashboard",
    "products",
    "orders",
    "users",
    "messages"
  ];

  showSidenav:boolean = false;

  faXmark = faXmark;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleAdminSidenav(event:boolean){
    this.showSidenav = event;
  }

}
