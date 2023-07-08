import { Component, OnInit } from '@angular/core';
import { StatusBar, SetOverlaysWebViewOptions, StyleOptions, Style } from '@capacitor/status-bar';
import { Params } from 'src/app/Params';

@Component({
  selector: 'app-upcoming-tab',
  templateUrl: './upcoming-tab.page.html',
  styleUrls: ['./upcoming-tab.page.scss'],
})
export class UpcomingTabPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    StatusBar.show();

    let options: SetOverlaysWebViewOptions = {
      overlay: false
    }

    StatusBar.setOverlaysWebView(options)

    StatusBar.setBackgroundColor({ 'color': Params.COLORS.PRIMARY_BACKGROUND })

    let style: StyleOptions = {
      style: Style.Dark
    }

    StatusBar.setStyle(style)

  }

}
