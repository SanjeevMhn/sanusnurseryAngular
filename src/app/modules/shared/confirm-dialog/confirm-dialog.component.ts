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
  @Output() cancelOptionEvent = new EventEmitter();

  constructor(private confirmModalService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.confirmModalService.$confirmState.subscribe((confirmModal: ConfirmModal) => {
      this.confirmModal = confirmModal;
    })
  }
  public close(){
    // this.confirmModal!.visible = false;
    this.confirmModalService.hide();
    this.toggleConfirm.emit()
  }

  public confirm() {
    
  }

  public cancel(): Boolean{
    return this.confirmModalService.cancel(); 
  }

}
