import { Component, OnInit } from '@angular/core';
import { faDatabase, faSpa, faTruck, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faSpa = faSpa;
  faTruck = faTruck;
  faUsers = faUsers;
  faDatabase = faDatabase;

  constructor() { }

  ngOnInit(): void {
  }

}
