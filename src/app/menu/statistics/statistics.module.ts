import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';
import { NgCircleProgressModule } from 'ng-circle-progress'; // Importe o módulo aqui

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
    NgCircleProgressModule.forRoot({
      unitsColor: "#fff",
      titleColor: "#fff",
      subtitleColor: "#b3b3b3",
      radius: 60,
      outerStrokeWidth: 10,
      innerStrokeWidth: 5,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      titleFontSize: "40",
      unitsFontSize: "30",
      subtitleFontSize: "16",
    })
  ],

  declarations: [StatisticsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatisticsPageModule {}
