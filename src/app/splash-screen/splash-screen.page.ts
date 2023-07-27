import { Component, OnInit } from '@angular/core';
import { SetOverlaysWebViewOptions, StatusBar, Style, StyleOptions } from '@capacitor/status-bar';
import { Params } from '../Params';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  isLoading : boolean = false;

  constructor(private navCtrl: NavController) {

    setTimeout(() => {
      
      this.navCtrl.navigateRoot('movie-details')

    }, 2000);

   }

  ngOnInit() {
  }

  ionViewWillEnter() {

    StatusBar.hide();

    let options: SetOverlaysWebViewOptions = {
      overlay: true
    }

    StatusBar.setOverlaysWebView(options)
    // StatusBar.setBackgroundColor({ 'color': Params.COLORS.PRIMARY_BACKGROUND })

    // let style: StyleOptions = {
    //   style: Style.Dark
    // }

    // StatusBar.setStyle(style)

  }

}
