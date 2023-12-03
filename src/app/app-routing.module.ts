import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
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
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'exercise/:exerciseId',
    loadChildren: () => import('./exercise/exercise.module').then( m => m.ExercisePageModule)
  },
  {
    path: 'repetitive-exercise/:exerciseId',
    loadChildren: () => import('./repetitive-exercise/repetitive-exercise.module').then( m => m.RepetitiveExercisePageModule)
  },
  {
    path: 'timed-exercise/:exerciseId',
    loadChildren: () => import('./timed-exercise/timed-exercise.module').then( m => m.TimedExercisePageModule)
  },
  {
    path: 'first-introduction',
    loadChildren: () => import('./introduction/first-introduction/first-introduction.module').then( m => m.FirstIntroductionPageModule)
  },
  
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  },

  {
    path: 'home-list',
    loadChildren: () => import('./home-list/home-list.module').then (m => m.HomeListPageModule)
  },
  {
    path: 'studentfitnessanalysis',
    loadChildren: () => import('./studentfitnessanalysis/studentfitnessanalysis.module').then( m => m.StudentfitnessanalysisPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
