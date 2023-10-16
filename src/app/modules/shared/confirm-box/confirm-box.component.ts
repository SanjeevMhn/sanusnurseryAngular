import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'src/app/services/confirmation.service';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

  constructor(public confirmService: ConfirmationService) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.confirmService.onConfirm();
  }

  onCancel() {
    this.confirmService.onCancel();
  }

}
