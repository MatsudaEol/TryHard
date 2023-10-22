import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ExerciseService } from '../services/exercise.service';


@Component({
  selector: 'app-repetitive-exercise',
  templateUrl: './repetitive-exercise.page.html',
  styleUrls: ['./repetitive-exercise.page.scss'],
})
export class RepetitiveExercisePage implements OnInit {
  exerciseData: any;
  
  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const exerciseId = params.get('exerciseId');
      const userId = await this.authService.getUserId();

      if (exerciseId && userId) {
        this.exerciseService.getExerciseDetails(userId, exerciseId).subscribe((exerciseData) => {
          //console.log('Detalhes do exercício:', exerciseData);
          this.exerciseData = exerciseData;

          // Nota:  Inserir um serviço de gerenciamento de estado
        });
      }
    });

  }
}