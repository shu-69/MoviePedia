import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () => import('../tabs/home-tab/home-tab.module').then(m => m.HomeTabPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () => import('../tabs/search-tab/search-tab.module').then(m => m.SearchTabPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () => import('../tabs/upcoming-tab/upcoming-tab.module').then(m => m.UpcomingTabPageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () => import('../tabs/trailer-tab/trailer-tab.module').then(m => m.TrailerTabPageModule)
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
