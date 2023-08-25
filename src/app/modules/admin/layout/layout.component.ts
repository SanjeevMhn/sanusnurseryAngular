import { Component, OnInit } from '@angular/core';
import { faChartSimple, faChevronRight, faCircle, faEnvelope, faReceipt, faSpa, faTruck, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';

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
export class LayoutComponent implements OnInit {

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
  
  constructor(private confirmService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.confirmService.show("Hello");
  }

  toggleAdminSidenav(event:boolean){
    this.showSidenav = event;
  }

  toggleConfirm(value: boolean){
    this.showConfirmDialog = value;
  }

}
