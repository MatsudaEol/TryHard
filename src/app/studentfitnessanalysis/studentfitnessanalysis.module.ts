import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentfitnessanalysisPageRoutingModule } from './studentfitnessanalysis-routing.module';

import { StudentfitnessanalysisPage } from './studentfitnessanalysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentfitnessanalysisPageRoutingModule
  ],
  declarations: [StudentfitnessanalysisPage]
})
export class StudentfitnessanalysisPageModule {}
