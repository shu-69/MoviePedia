import { Component, OnInit } from '@angular/core';
import { SetOverlaysWebViewOptions, StatusBar, Style, StyleOptions } from '@capacitor/status-bar';
import { Params } from '../Params';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  isLoading: boolean = false;

  constructor(private storage: Storage, private navCtrl: NavController) {





  }

  async ngOnInit() {

    if (await this.storage.get('loggin-skipped')) {

      setTimeout(() => {

        this.navCtrl.navigateRoot('home')

      }, 2000);

    } else if (await this.storage.get('username')) {

      setTimeout(() => {

        this.navCtrl.navigateRoot('home')

      }, 2000);

    } else {

      setTimeout(() => {

        this.navCtrl.navigateRoot('authenticate')

      }, 2000);

    }

  }

  ionViewWillEnter() {

    StatusBar.hide();

    let options: SetOverlaysWebViewOptions = {
      overlay: true
    }

    StatusBar.setOverlaysWebView(options)

  }

}
