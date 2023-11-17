import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstIntroductionPageRoutingModule } from './first-introduction-routing.module';

import { FirstIntroductionPage } from './first-introduction.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstIntroductionPageRoutingModule
  ],
  declarations: [FirstIntroductionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FirstIntroductionPageModule {}
