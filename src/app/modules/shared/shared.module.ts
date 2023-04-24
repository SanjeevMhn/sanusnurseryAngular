import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductcardComponent } from './productcard/productcard.component';
import { ContactHeaderComponent } from './contact-header/contact-header.component';


@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    ProductcardComponent,
    ContactHeaderComponent
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
  ]
})
export class SharedModule { }
