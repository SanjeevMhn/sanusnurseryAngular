import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CategoryModal } from './category-modal';
import { CategoryModalService } from './category-modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  public categoryModal?:CategoryModal;
  faClose = faClose;
  formMode?:string;

  categoryForm!: FormGroup;
  categoryNameErr = false;
  categoryNameErrMsg:string = '';

  constructor(
    private categoryModalService: CategoryModalService, 
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.categoryModalService.$categroyModalState.subscribe((categoryModal: CategoryModal) => {
      this.categoryModal = categoryModal;
    })

    this.formMode = this.categoryModal?.mode;

    this.categoryForm = this.fb.group({
      category_name: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    })
  }

  close(){
    this.categoryModalService.hide();
    this.categoryForm.reset();
    this.categoryNameErr = false;
  }

  submit(){
    this.categoryNameErr = false;
    if(this.categoryForm.invalid){
      if(this.categoryForm.controls['category_name'].errors?.['required']){
        this.categoryNameErr = true;
        this.categoryNameErrMsg = "Please enter category name";
      }

      if(this.categoryForm.controls['category_name'].errors?.['minlength']){
        this.categoryNameErr = true;
        this.categoryNameErrMsg = "Category name cannot be less than 4 letters"
      }

      if(this.categoryForm.controls['category_name'].errors?.['maxlength']){
        this.categoryNameErr = true;
        this.categoryNameErrMsg = "Category name cannot be more than 50 letters"
      }
      return;
    }
    if(this.formMode === 'add'){
      this.http.post(environment.categoriesUrl,{category_name: this.categoryForm.controls['category_name'].value},{withCredentials: true}).subscribe({
        next: (data: any) => {
          this.close();
          this.toastService.show(data.message, ToastType.success);
        },
        error: (err: any) => {
          this.categoryNameErr = true;
          this.categoryNameErrMsg = "Category already exists"
        }

      })
    }
  }


}
