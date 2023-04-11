import { Component, OnInit } from '@angular/core';
import { faSearch, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faSearch = faSearch;
  faPhone = faPhone;

  constructor() { }

  ngOnInit(): void {
  }

}
