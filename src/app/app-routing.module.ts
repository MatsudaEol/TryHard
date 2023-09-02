import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./menu/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./menu/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./menu/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./menu/statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./menu/profile/profile.module').then( m => m.ProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
