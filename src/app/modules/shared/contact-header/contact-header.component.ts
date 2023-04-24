import { Component, OnInit } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-header',
  templateUrl: './contact-header.component.html',
  styleUrls: ['./contact-header.component.scss']
})
export class ContactHeaderComponent implements OnInit {

  faPhone = faPhone;

  constructor() { }

  ngOnInit(): void {
    if(!this.isVisible()){

    }
  }

  isVisible(){
    return true;
  }

}
