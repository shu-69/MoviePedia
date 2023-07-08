import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashScreenPageRoutingModule } from './splash-screen-routing.module';

import { SplashScreenPage } from './splash-screen.page';
import { MovieTileComponent } from '../components/movie-tile/movie-tile.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashScreenPageRoutingModule, 
  ],
  declarations: [SplashScreenPage]
})
export class SplashScreenPageModule {}
