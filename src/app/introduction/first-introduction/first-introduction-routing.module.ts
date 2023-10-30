import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstIntroductionPage } from './first-introduction.page';

const routes: Routes = [
  {
    path: '',
    component: FirstIntroductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstIntroductionPageRoutingModule {}
