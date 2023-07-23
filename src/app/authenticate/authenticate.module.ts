import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticatePageRoutingModule } from './authenticate-routing.module';

import { AuthenticatePage } from './authenticate.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticatePageRoutingModule, ReactiveFormsModule, SwiperModule
  ],
  declarations: [AuthenticatePage]
})
export class AuthenticatePageModule {}
