import { Component, OnInit} from '@angular/core';
import { faChartSimple, faChevronRight, faCircle, faEnvelope, faReceipt, faSpa, faTruck, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type AdminSidenav = {
  icon: IconProp,
  name: string,
  link?: string,
  linkParams?: boolean,
  subMenu?: AdminSidenav[]
}


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{

  faChartSimple = faChartSimple;
  faSpa = faSpa;
  faTruck = faTruck;
  faReceipt = faReceipt;
  faUsers = faUsers;
  faEnvelope = faEnvelope;
  faCircle = faCircle;
  faChevronRight = faChevronRight;

  showConfirmDialog:boolean = false;

  sidenavList: AdminSidenav[] = [
    {
      icon: faChartSimple,
      name:"dashboard"
    },
    {
      icon: faSpa,
      name: "products",
      subMenu: [
        {
          icon: faCircle,
          name: "product list",
          link: "products",
          linkParams: false,
        },
        {
          icon: faCircle,
          name: "add product",
          link: "add-product",
          linkParams: true,
        },
        {
          icon: faCircle,
          name: "categories",
          link: "product-categories"
        }
      ]
    },
    {
      icon: faReceipt,
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

  ngOnInit(): void {}

  toggleAdminSidenav(event:boolean){
    this.showSidenav = event;
  }


}
