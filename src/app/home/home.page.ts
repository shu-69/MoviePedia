import { Component, ViewEncapsulation } from '@angular/core';
import { SetOverlaysWebViewOptions, StatusBar, Style, StyleOptions } from '@capacitor/status-bar';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Movie } from '../Params';
import { IonTabButton } from '@ionic/angular';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  filter = {

    'white' : 'brightness(0) saturate(100%) invert(96%) sepia(0%) saturate(7489%) hue-rotate(171deg) brightness(102%) contrast(106%);',
    'gray' : 'brightness(0) saturate(100%) invert(89%) sepia(3%) saturate(22%) hue-rotate(4deg) brightness(92%) contrast(82%);'

  }

  constructor() { 


  }

  get(b : any){

    console.log(b)

  }



}
