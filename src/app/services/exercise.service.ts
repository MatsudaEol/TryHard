import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private afs: AngularFirestore) {}

  getExercises(userId: string) {
    return this.afs.collection('userExercises', (ref) => ref.where('userId', '==', userId)).valueChanges().pipe(
      switchMap((userExercises: any[]) => {
        const exerciseObservables = userExercises.map((userExercise: any) => {
          const exerciseObservables = userExercise.exercises.map((e: any) => {
            const exerciseId = e.exerciseId;
            return this.afs.doc(`exercises/${exerciseId}`).valueChanges().pipe(
              map((exerciseData: any) => {
                const type = exerciseData.type;
                const reps = type === 'rep' ? e.reps : undefined;
                const sets = type === 'rep' ? e.sets : undefined;
                const amount = type === 'time' ? e.amount : undefined;

                return {
                  exerciseId,
                  reps,
                  sets,
                  amount,
                  ...exerciseData
                };
              })
            );
          });

          return combineLatest(exerciseObservables);
        });

        
        return combineLatest(exerciseObservables).pipe(
          map((updatedUserExercises: any[]) => {
            userExercises.forEach((userExercise, index) => {
              userExercise.exercises = updatedUserExercises[index];
            });
            return userExercises;
          })
        );
      })
    );
  }

  getExerciseById(exerciseId: string) {
    return this.afs.doc(`exercises/${exerciseId}`).valueChanges();
  }

  clearUserExercises() {
    localStorage.removeItem('userExercises'); 
  }
}