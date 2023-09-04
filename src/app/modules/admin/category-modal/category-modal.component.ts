import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CategoryModal } from './category-modal';
import { CategoryModalService } from './category-modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';
import { CategoryService } from 'src/app/services/category.service';
import { retry } from 'rxjs';
import { isObjectEmpty } from 'src/app/utils/functions/isObjectEmpty';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  public categoryModal?: CategoryModal;
  faClose = faClose;
  formMode?: string;
  cat_id?: number;

  categoryForm!: FormGroup;
  categoryNameErr = false;
  categoryNameErrMsg: string = '';

  editCategoryData?:any;

  constructor(
    private categoryModalService: CategoryModalService, 
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService,
    private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryModalService.$categoryModalState.subscribe((categoryModal: CategoryModal) => {
      this.categoryModal = categoryModal;
    })

    this.categoryModalService.latestModalMode.subscribe((mode: string) => {
      this.formMode = mode;
    })

    this.categoryModalService.editCategoryData.subscribe((data:any) =>{
      this.editCategoryData = data;
      if(!isObjectEmpty(this.editCategoryData)){
        this.fillForm();
      }
    })

    this.categoryForm = this.fb.group({
      category_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    })
  }

  fillForm(){
    this.categoryForm.patchValue({
      category_name: this.editCategoryData.prod_cat_name
    })
  }

  close() {
    this.categoryModalService.hide();
    this.categoryForm.reset();
    this.categoryNameErr = false;
    this.editCategoryData = null;
  }

  submit() {
    this.categoryNameErr = false;
    if (this.categoryForm.invalid) {
      if (this.categoryForm.controls['category_name'].errors?.['required']) {
        this.categoryNameErr = true;
        this.categoryNameErrMsg = "Please enter category name";
      }

      if (this.categoryForm.controls['category_name'].errors?.['minlength']) {
        this.categoryNameErr = true;
        this.categoryNameErrMsg = "Category name cannot be less than 4 letters"
      }

      if (this.categoryForm.controls['category_name'].errors?.['maxlength']) {
        this.categoryNameErr = true;
        this.categoryNameErrMsg = "Category name cannot be more than 50 letters"
      }
      return;
    }
    if (this.formMode === 'add') {
      this.http.post(environment.categoriesUrl, { category_name: this.categoryForm.controls['category_name'].value }, { withCredentials: true }).pipe(retry(3)).subscribe({
        next: (data: any) => {
          this.close();
          this.toastService.show(data.message, ToastType.success);
          this.categoryService.getCategories().subscribe({
            next: (data: any) => {
              this.categoryService.updatedCategories(data.categories);
            },
            error: (err: any) => {
              console.error(err);
            }
          })
        },
        error: (err: any) => {
          this.categoryNameErr = true;
          this.categoryNameErrMsg = "Category already exists"
        }

      })
    }else{
      if(this.categoryForm.controls['category_name'].value == this.editCategoryData.prod_cat_name){
        this.categoryNameErr = true;
        this.categoryNameErrMsg = "No changes found";
        return;
      }

      this.http.patch(`${environment.categoriesUrl}/id/${this.editCategoryData.prod_cat_id}`,{prod_cat_name: this.categoryForm.controls['category_name'].value},{withCredentials: true}).subscribe({
        next: (data: any) => {
          this.close();
          this.toastService.show(data.message, ToastType.success);
          this.categoryService.getCategories().subscribe({
            next: (data: any) => {
              this.categoryService.updatedCategories(data.categories);
            },
            error: (err: any) => {
              console.error(err);
            }
          })
        }
      })      
    }
  }


}
