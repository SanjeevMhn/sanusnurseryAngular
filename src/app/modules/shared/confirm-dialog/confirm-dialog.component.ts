import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmDialogService } from './confirm-dialog.service';
import { ConfirmModal } from './confirm-modal';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  public confirmModal?: ConfirmModal;

  faClose = faClose;

  @Output() toggleConfirm = new EventEmitter()
  @Output() confirmOptionEvent = new EventEmitter();

  constructor(private confirmModalService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.confirmModalService.$confirmState.subscribe((confirmModal: ConfirmModal) => {
      this.confirmModal = confirmModal;
    })
  }
  public close(){
    this.confirmModalService.hide();
    this.toggleConfirm.emit()
  }

  public confirm() {
    this.confirmModalService.confirm();
  }

  public cancel(){
    this.confirmModalService.cancel();
  }

}
