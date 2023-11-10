import { Component, NgModule } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GaugeModule } from 'angular-gauge';

@NgModule({
  imports: [GaugeModule.forRoot()],

})
export class MyModule {}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
  template: `
  <mwl-gauge
    [max]="100"
    [dialStartAngle]="-90"
    [dialEndAngle]="-90.001"
    [value]="50"
    [animated]="true"
    [animationDuration]="1"
  >
  </mwl-gauge>
  `,
})
export class StatisticsPage {
  seuPercentualDeProgresso: number = 50; // Defina um valor padrão
  seuDateTime: string; // Defina uma variável para o datetime

  constructor(private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: StatisticsPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // A data selecionada estará em data.data
        console.log('Data selecionada:', data.data);
      }
    });

    return await modal.present();
  }
}
