import { Component, OnInit } from '@angular/core';
import { BdtempService } from 'src/app/services/bdtemp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listExercises: any[] = [];

  constructor(private bdtempService: BdtempService) { }

   ngOnInit() {

    this.listExercises = this.bdtempService.listExercises;

  }

}
