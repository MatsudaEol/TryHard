import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-introduction',
  templateUrl: './first-introduction.page.html',
  styleUrls: ['./first-introduction.page.scss']
})
export class FirstIntroductionPage {

  constructor(public modalController: ModalController) {

  }
  

}
