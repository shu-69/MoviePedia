import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchTabPageRoutingModule } from './search-tab-routing.module';

import { SearchTabPage } from './search-tab.page';
import { MovieTileComponent } from 'src/app/components/movie-tile/movie-tile.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchTabPageRoutingModule, ComponentsModule,
  ],
  
  declarations: [SearchTabPage ]
})
export class SearchTabPageModule {}
