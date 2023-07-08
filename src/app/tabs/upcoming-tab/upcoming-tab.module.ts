import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingTabPageRoutingModule } from './upcoming-tab-routing.module';

import { UpcomingTabPage } from './upcoming-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingTabPageRoutingModule
  ],
  declarations: [UpcomingTabPage]
})
export class UpcomingTabPageModule {}
