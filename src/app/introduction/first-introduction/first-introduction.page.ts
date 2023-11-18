import { Component } from '@angular/core';



@Component({
 selector: 'app-first-introduction',
 templateUrl: './first-introduction.page.html',
 styleUrls: ['./first-introduction.page.scss'],
})
export class FirstIntroductionPage {
    public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Insira seu gênero',
    },
    {
      type: 'decimal',
      placeholder: 'Peso',
      min: 1,
      max: 100,
    },
    {
      type: 'number',
      placeholder: 'Digite sua altura',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];
}

