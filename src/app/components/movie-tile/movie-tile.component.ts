import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss'],
})
export class MovieTileComponent  implements OnInit {

  @Input() src : string = '';
  @Input() compressedImg : string = '';  // TODO ::
  
  @Input() parentMaxWidth : string = '100%';
  @Input() parentWidth : string = 'fit-content';
  @Input() parentHeight : string = '100%';

  @Input() imgMaxHeight : string = '100%';
  @Input() imgBorderRadius : string = '14px';
  @Input() imgHeight : string = '100%';
  @Input() imgObjectFit : string = 'cover';
  @Input() imgBackground : string = '';


  constructor() { }

  ngOnInit() {}

}
