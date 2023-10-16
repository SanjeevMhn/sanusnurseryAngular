import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductcardComponent } from './productcard/productcard.component';
import { ContactHeaderComponent } from './contact-header/contact-header.component';
import { ToastComponent } from './toast/toast.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';


@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    ProductcardComponent,
    ContactHeaderComponent,
    ToastComponent,
    ConfirmBoxComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FontAwesomeModule,
  ],
  exports:[
    NavigationComponent,
    FooterComponent,
    FontAwesomeModule,
    ProductcardComponent,
    ContactHeaderComponent,
    ToastComponent,
    ConfirmBoxComponent
  ]
})
export class SharedModule { }
