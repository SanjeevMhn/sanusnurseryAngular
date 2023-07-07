import { Component, OnInit } from '@angular/core';
import { faChartSimple, faEnvelope, faSpa, faTruck, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type AdminSidenav = {
  icon: IconProp,
  name: string,
}


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  faChartSimple = faChartSimple;
  faSpa = faSpa;
  faTruck = faTruck;
  faUsers = faUsers;
  faEnvelope = faEnvelope;

  sidenavList: AdminSidenav[] = [
    {
      icon: faChartSimple,
      name:"dashboard"
    },
    {
      icon: faSpa,
      name: "products"
    },
    {
      icon: faTruck,
      name: "orders"
    },
    {
      icon: faUsers,
      name: "users"
    },
    {
      icon: faEnvelope,
      name: "messages"
    }
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
