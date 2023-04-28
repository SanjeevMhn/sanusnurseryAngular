import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  faClose = faClose; 

  constructor() { }

  ngOnInit(): void {
  }

}
