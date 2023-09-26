import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BdtempService } from 'src/app/services/bdtemp.service';

@Component({
  selector: 'app-timed-exercise',
  templateUrl: './timed-exercise.page.html',
  styleUrls: ['./timed-exercise.page.scss'],
})
export class TimedExercisePage implements OnInit {
  exercise: any;
  exerciseNumber: number = 1;
  
  constructor(private activatedRoute: ActivatedRoute, private bdtempService : BdtempService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const exerciseId = paramMap.get('id');

      // Verifica se exerciseId não é nulo antes de fazer a comparação
      if (exerciseId !== null) {
        // Use o ID para buscar os detalhes do exercício
        this.exercise = this.bdtempService.getExerciseById(exerciseId);

        // Calcula o número do exercício com base na posição na lista
        const exerciseIndex = this.bdtempService.listExercises.findIndex(
          (exercise) => exercise.id === +exerciseId
        );

        if (exerciseIndex !== -1) {
          this.exerciseNumber = exerciseIndex + 1;
        }
      }
    });

  }
  
}