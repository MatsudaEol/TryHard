import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstIntroductionPageRoutingModule } from './first-introduction-routing.module';

import { FirstIntroductionPage } from './first-introduction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstIntroductionPageRoutingModule
  ],
  declarations: [FirstIntroductionPage]
})
export class FirstIntroductionPageModule {}
