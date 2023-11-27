import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobrePageRoutingModule } from './sobre-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SobrePage } from './sobre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobrePageRoutingModule
  ],
  declarations: [SobrePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SobrePageModule {}
