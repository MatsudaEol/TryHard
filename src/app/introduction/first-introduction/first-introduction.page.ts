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
      name: 'gender',
      type: 'select',
      placeholder: 'Selecione seu gênero',
      options: ['Masculino', 'Feminino'],
  },
  {
    type: 'number',
    placeholder: 'Peso (kg)',
    min: 1,
    max: 300,
  },
  {
    type: 'text',
    placeholder: 'Altura (cm)',
    pattern: '^[0-9]{1,3}(,[0-9]{1,2})?$',
    title: 'Informe a altura no formato correto (ex: 180,50)',
},
  {
    name: 'training',
    type: 'radio',
    label: 'Você já treinou?',
    options: [
        { label: 'Sim', value: 'Sim' },
        { label: 'Não', value: 'Não' }
    ],
}
];
}

