import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss'],
})
export class MovieTileComponent  implements OnInit {

  @Input() src : string = '';
  @Input() compressedImg : string = '';  // TODO ::
  @Input() id : string = '';
  
  @Input() parentMaxWidth : string = '100%';
  @Input() parentWidth : string = 'fit-content';
  @Input() parentHeight : string = '100%';

  @Input() imgMaxHeight : string = '100%';
  @Input() imgBorderRadius : string = '14px';
  @Input() imgHeight : string = '100%';
  @Input() imgObjectFit : string = 'cover';
  @Input() imgBackground : string = '';


  constructor(public navCtrl: NavController, public generalServices: GeneralService) { }

  ngOnInit() {}

}
