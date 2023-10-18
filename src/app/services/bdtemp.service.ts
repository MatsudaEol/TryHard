import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BdtempService {

  listExercises = [
  ];
  
  constructor() { }

  getExerciseById(id: string) {
    const exerciseId = parseInt(id, 10); // Convertemos o ID para um número inteiro

    const exercise = this.listExercises.find(exercise => exercise.id === exerciseId);

    return exercise;
  }

}
