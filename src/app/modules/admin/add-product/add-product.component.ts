import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from '../../shared/toast/toast.modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  prodCategories?: any[];
  editProduct: any;
  editMode: boolean = false;
  editProductId?: number;
  imgSrc: any;
  image: any;
  placeholder: string = "./assets/images/placeholder.jpg";

  addProductForm!: FormGroup;
  prodNameError: boolean = false;
  prodNameErrMsg: string = '';
  prodCategoryError: boolean = false;
  prodCategoryErrMsg: string = '';
  prodPriceError: boolean = false;
  prodPriceErrMsg: string = '';

  titleText: string = '';
  paramId?:number;


  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute) { }

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

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId === '' || paramId === null) {
      this.titleText = "Add Product";
    } else {
      this.paramId = Number(paramId);
      this.editMode = true;
      this.titleText = "Edit Product";
      this.editProductId = Number(paramId);
      this.loadProduct(Number(paramId));
    }

  }


  loadProduct(id: number) {
    this.productService.getPlantFromId(id).subscribe({
      next: (data: any) => {
        this.editProduct = data.product[0];
        this.imgSrc = data.product[0].prod_img;
        this.fillForm();
      },
      error: (err: any) => {
        console.error(err);
      }
    })

  }

  fillForm() {
    this.addProductForm.patchValue({
      prod_name: this.editProduct.prod_name,
      prod_category: this.editProduct.prod_category,
      prod_price: this.editProduct.prod_price,
      prod_inStock: String(this.editProduct.prod_inStock)
    });
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

      if(this.addProductForm.controls['prod_name'].errors?.['minlength']){
        this.prodNameError = true;
        this.prodNameErrMsg = "Product name cannot be less than 8 characters";
      }

      if (this.addProductForm.controls['prod_category'].errors?.['required']) {
        this.prodCategoryError = true;
        this.prodCategoryErrMsg = 'Please select product category'
      }

      if (this.addProductForm.controls['prod_price'].errors?.['required']) {
        this.prodPriceError = true;
        this.prodPriceErrMsg = 'Please enter product price';
      }
      return;
    }

    let addProductFormValue = this.addProductForm.value;
    // console.log(addProductFormValue)
    if (!this.editMode) {

      if (this.image == null || !this.image) {
        this.toastService.show('Please upload product image', ToastType.error);
        return;
      }

      let formData: any = new FormData();
      formData.append('prod_name', addProductFormValue.prod_name)
      formData.append('prod_category', addProductFormValue.prod_category)
      formData.append('prod_price', addProductFormValue.prod_price)
      formData.append('prod_inStock', addProductFormValue.prod_inStock)
      formData.append('image', this.image);


      // formData.forEach((val: any, key: any) => {
      //   console.log(`${key} : ${val}`)
      // })

      this.http.post<any>(environment.baseUrl, formData, { withCredentials: true }).subscribe({
        next: (data: any) => {
          this.toastService.show(data.message, ToastType.success);
          this.addProductForm.reset();
          this.image = '';
          this.imgSrc = '';
        },
        error: (err: any) => {
          this.toastService.show(err.error.message, ToastType.error);
        }
      })
    } else {

      let updatedValues: any = new FormData();

      for (const key in addProductFormValue) {
        if (addProductFormValue.hasOwnProperty(key) && addProductFormValue[key] !== this.editProduct[key]) {
          updatedValues.append(key, addProductFormValue[key]);
        }
      }

      if (this.image) {
        updatedValues.append('image', this.image);
      }

      // updatedValues.forEach((val: any, key: any) => {
      //   console.log(`${key} : ${val}`);
      // })

      this.http.patch<any>(`${environment.baseUrl}/id/${this.editProductId}`, updatedValues, { withCredentials: true, observe: 'response' }).subscribe({
        next: (data: any) => {
          if (data.status === 204) {
            this.toastService.show("Product Updated!", ToastType.success);
            this.router.navigate(['/admin/products/']);
            this.addProductForm.reset();
            this.image = '';
            this.imgSrc = '';
          }

        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }

  }

  deleteProduct(){
    if(window.confirm("Do you really want to delete this product?")){
      this.http.delete(`${environment.baseUrl}/id/${this.paramId!}`,{withCredentials: true, observe: 'response'}).subscribe({
        next:(data:any) => {
          if(data.status === 200){
            this.toastService.show("Product has been deleted",ToastType.success);
            this.router.navigate(['/admin/products']);
          }

        },
        error:(err: any) => {
          console.error(err);
        }
      })
    }
  }


}
