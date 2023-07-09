import { Component, OnInit, Input } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-data-grid-row',
  templateUrl: './data-grid-row.component.html',
  styleUrls: ['./data-grid-row.component.scss']
})
export class DataGridRowComponent implements OnInit {


  @Input() item:any;
  @Input() index:number = 0;

  faEllipsis = faEllipsis;
  showDropdown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
    // console.log(event.target);
  }

}
