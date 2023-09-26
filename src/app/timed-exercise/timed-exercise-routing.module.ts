import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimedExercisePage } from './timed-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: TimedExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimedExercisePageRoutingModule {}
