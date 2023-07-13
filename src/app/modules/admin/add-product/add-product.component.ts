import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  prodCategories?: any[];
  imgSrc: any;
  image: any;

  addProductForm!: FormGroup;
  prodNameError: boolean = false;
  prodNameErrMsg: string = '';
  prodCategoryError: boolean = false;
  prodCategoryErrMsg: string = '';
  prodPriceError: boolean = false;
  prodPriceErrMsg: string = '';

  constructor(private productService: ProductService, private fb: FormBuilder, private http:HttpClient, private toastService: ToastService) { }

  ngOnInit(): void {
    this.productService.getPlantCategories().subscribe({
      next: (data: any) => {
        this.prodCategories = data.categories;
      },
      error: (err: any) => {
        console.error(err)
      }
    })

    this.addProductForm = this.fb.group({
      prod_name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      prod_category: ['', [Validators.required]],
      prod_price: ['', [Validators.required]],
      prod_inStock: ['true', [Validators.required]],
    })
  }

  showImg(event: any) {
    let file: HTMLInputElement = event.target;

    if (file.files && file.files[0]) {
      this.image = file.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imgSrc = reader.result;
      reader.readAsDataURL(this.image);
    }
  }

  submit() {
    this.prodNameError = false;
    this.prodCategoryError = false;
    this.prodPriceError = false;

    if (this.addProductForm.invalid) {
      // console.log(this.addProductForm.errors);
      this.toastService.show('Errors in add product form', ToastType.error);
      if (this.addProductForm.controls['prod_name'].errors?.['required']) {
        this.prodNameError = true;
        this.prodNameErrMsg = "Please enter product name";
      }

      if(this.addProductForm.controls['prod_category'].errors?.['required']){
        this.prodCategoryError = true;
        this.prodCategoryErrMsg = 'Please select product category'
      }

      if(this.addProductForm.controls['prod_price'].errors?.['required']){
        this.prodPriceError = true;
        this.prodPriceErrMsg = 'Please enter product price';
      }
     

      return;
    }

    if(this.image == null || !this.image){
      this.toastService.show('Please upload product image',ToastType.error);
      return;
    }

    let addProductFormValue = this.addProductForm.value;
    // console.log(addProductFormValue)
    let formData: any = new FormData();
    formData.append('prod_name', addProductFormValue.prod_name)
    formData.append('prod_category',addProductFormValue.prod_category)
    formData.append('prod_price',addProductFormValue.prod_price)
    formData.append('prod_inStock',addProductFormValue.prod_inStock)
    formData.append('image', this.image);

    // console.log(formData);

    formData.forEach((val: any, key: any) => {
      console.log(`${key} : ${val}`)
    })

    this.http.post<any>(environment.baseUrl,formData,{withCredentials: true}).subscribe({
      next:(data:any) => {
        this.toastService.show(data.message, ToastType.success);
        this.addProductForm.reset();
        this.image = '';
        this.imgSrc = '';
      },
      error: (err: any) => {
        console.error(err);
      }
    })

  }



}
