import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MovieTileComponent } from './components/movie-tile/movie-tile.component';
import { SearchTabPage } from './tabs/search-tab/search-tab.page';
import { SearchTabPageModule } from './tabs/search-tab/search-tab.module';
import { ComponentsModule } from './components/components.module';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import * as firebase from 'firebase/app';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule, ComponentsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SpeechRecognition, Storage],
  bootstrap: [AppComponent ],
})
export class AppModule {}
