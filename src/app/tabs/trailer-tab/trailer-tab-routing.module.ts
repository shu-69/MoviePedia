import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrailerTabPage } from './trailer-tab.page';

const routes: Routes = [
  {
    path: '',
    component: TrailerTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrailerTabPageRoutingModule {}
