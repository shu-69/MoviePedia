import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieTileComponent } from './movie-tile/movie-tile.component';



@NgModule({
  declarations: [
    MovieTileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MovieTileComponent
  ]
})
export class ComponentsModule { }
