import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTabPageRoutingModule } from './home-tab-routing.module';

import { HomeTabPage } from './home-tab.page';
import { SwiperModule } from 'swiper/angular';
import { MovieTileComponent } from 'src/app/components/movie-tile/movie-tile.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTabPageRoutingModule, SwiperModule, LazyLoadImageModule, ComponentsModule
  ],
  declarations: [HomeTabPage]
})
export class HomeTabPageModule {}
