import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingTabPage } from './upcoming-tab.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingTabPageRoutingModule {}
