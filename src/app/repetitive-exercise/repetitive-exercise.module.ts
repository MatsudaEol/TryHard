import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepetitiveExercisePageRoutingModule } from './repetitive-exercise-routing.module';

import { RepetitiveExercisePage } from './repetitive-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepetitiveExercisePageRoutingModule
  ],
  declarations: [RepetitiveExercisePage]
})
export class RepetitiveExercisePageModule {}
