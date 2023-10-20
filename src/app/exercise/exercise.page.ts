import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exerciseData: any;  // Certifique-se de que a propriedade 'exerciseData' seja declarada.

  constructor(
    private route: ActivatedRoute, 
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const exerciseId = params.get('exerciseId');
      if (exerciseId) {
        // Usar o exerciseId para recuperar os detalhes do exercício
        this.exerciseService.getExerciseById(exerciseId).subscribe((exerciseData) => {
          console.log('Detalhes do exercício:', exerciseData);
          // Agora você tem os detalhes do exercício e pode exibi-los na página "exercise"
          this.exerciseData = exerciseData;
        });
      }
    });
  }
}
