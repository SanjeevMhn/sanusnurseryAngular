import { Component, OnInit, Input } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../../shared/toast/toast.modal';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/services/confirmation.service';

@Component({
  selector: 'app-data-grid-row',
  templateUrl: './data-grid-row.component.html',
  styleUrls: ['./data-grid-row.component.scss']
})
export class DataGridRowComponent implements OnInit {


  @Input() item: any;
  @Input() index: number = 0;

  faEllipsis = faEllipsis;
  showDropdown: boolean = false;

  constructor(
    private http: HttpClient, 
    private toastService: ToastService, 
    private router: Router,
    private confirmService: ConfirmationService) { }

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    // console.log(event.target);
  }

  async deleteProduct(id: number) {
    if( await this.confirmService.initialize({message: 'Do you want to delete this product'})){
      this.http.delete(`${environment.baseUrl}/id/${id}`, { withCredentials: true, observe: 'response' }).subscribe({
        next: (data: any) => {
          if (data.status === 200) {
            this.toastService.show("Product has been deleted", ToastType.success);
            this.router.navigate(['/admin/products'])
          }

        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
    // if (window.confirm("Do you really want to delete this product?")) {
    //   this.http.delete(`${environment.baseUrl}/id/${id}`, { withCredentials: true, observe: 'response' }).subscribe({
    //     next: (data: any) => {
    //       if (data.status === 200) {
    //         this.toastService.show("Product has been deleted", ToastType.success);
    //         this.router.navigate(['/admin/products'])
    //       }

    //     },
    //     error: (err: any) => {
    //       console.error(err);
    //     }
    //   })
    // }
  }

}
