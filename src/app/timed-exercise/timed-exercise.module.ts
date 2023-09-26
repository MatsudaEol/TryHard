import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimedExercisePageRoutingModule } from './timed-exercise-routing.module';

import { TimedExercisePage } from './timed-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimedExercisePageRoutingModule
  ],
  declarations: [TimedExercisePage]
})
export class TimedExercisePageModule {}
