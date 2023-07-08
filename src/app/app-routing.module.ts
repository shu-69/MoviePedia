import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'authenticate',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'home-tab',
    loadChildren: () => import('./tabs/home-tab/home-tab.module').then( m => m.HomeTabPageModule)
  },
  {
    path: 'search-tab',
    loadChildren: () => import('./tabs/search-tab/search-tab.module').then( m => m.SearchTabPageModule)
  },
  {
    path: 'upcoming-tab',
    loadChildren: () => import('./tabs/upcoming-tab/upcoming-tab.module').then( m => m.UpcomingTabPageModule)
  },
  {
    path: 'authenticate',
    loadChildren: () => import('./authenticate/authenticate.module').then( m => m.AuthenticatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
