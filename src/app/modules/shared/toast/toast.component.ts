import { Component, OnInit, Input } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastModal } from './toast.modal';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  faClose = faClose; 
  public toastModal?: ToastModal;
  private $subscription?: Subscription;

  constructor(private toastService: ToastService) {
    this.$subscription = this.toastService.$toastState.subscribe((toastModal: ToastModal) => {
      this.toastModal = toastModal;
    })
   }

  ngOnInit(): void {
  }

  public close():void{
    this.toastModal!.visible = false;
  }

  onDestroy(){
    this.$subscription?.unsubscribe();
  }



}
