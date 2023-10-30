import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondIntroductionPage } from './second-introduction.page';

const routes: Routes = [
  {
    path: '',
    component: SecondIntroductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondIntroductionPageRoutingModule {}
