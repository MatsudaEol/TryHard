import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeListPage } from './home-list.page';

const routes: Routes = [
  {
    path: '',
    component: HomeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeListPageRoutingModule {}
