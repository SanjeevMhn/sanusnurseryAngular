import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductcardComponent } from './productcard/productcard.component';


@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    ProductcardComponent
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
  ]
})
export class SharedModule { }
