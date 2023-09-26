import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepetitiveExercisePage } from './repetitive-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: RepetitiveExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepetitiveExercisePageRoutingModule {}
