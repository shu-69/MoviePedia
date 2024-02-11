import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrailerTabPageRoutingModule } from './trailer-tab-routing.module';

import { TrailerTabPage } from './trailer-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrailerTabPageRoutingModule
  ],
  declarations: [TrailerTabPage]
})
export class TrailerTabPageModule {}
