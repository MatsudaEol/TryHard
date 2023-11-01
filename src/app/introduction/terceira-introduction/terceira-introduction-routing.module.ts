import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerceiraIntroductionPage } from './terceira-introduction.page';

const routes: Routes = [
  {
    path: '',
    component: TerceiraIntroductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerceiraIntroductionPageRoutingModule {}
