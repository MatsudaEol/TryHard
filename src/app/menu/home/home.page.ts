import { Component, OnInit } from '@angular/core';
import { BdtempService } from 'src/app/services/bdtemp.service';
import { PopoverController } from '@ionic/angular'; // Importe o PopoverController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listExercises: any[] = [];

  constructor(private bdtempService: BdtempService, public popoverController: PopoverController) { }

  ngOnInit() {
    this.listExercises = this.bdtempService.listExercises;
  }

  async closePopover() {
    await this.popoverController.dismiss();
  }
}
