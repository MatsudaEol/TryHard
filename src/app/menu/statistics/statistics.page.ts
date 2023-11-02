import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {
  @ViewChild(IonContent) content: IonContent;
  dataAtual: Date;
  diasExibidos: number[] = [];

  private startX: number;

  constructor() {
    this.dataAtual = new Date();
    this.inicializarCalendario();
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((event) => {
      if (event && event.detail) {
        if (event.detail.startX < this.startX) {
          this.avancarDia();
        } else if (event.detail.startX > this.startX) {
          this.retrocederDia();
        }
        this.startX = event.detail.startX;
      }
    });
  }

  inicializarCalendario() {
    const dataInicial = new Date(this.dataAtual);
    dataInicial.setDate(dataInicial.getDate() - 2);

    this.diasExibidos = [];
    for (let i = 0; i < 5; i++) {
      this.diasExibidos.push(dataInicial.getDate());
      dataInicial.setDate(dataInicial.getDate() + 1);
    }
  }

  avancarDia() {
    this.dataAtual.setDate(this.dataAtual.getDate() + 1);
    this.inicializarCalendario();
  }

  retrocederDia() {
    this.dataAtual.setDate(this.dataAtual.getDate() - 1);
    this.inicializarCalendario();
  }
}
