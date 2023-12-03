import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router
  ) {}

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

  getExerciseDetails(userId: string, exerciseId: string) {
    return this.getExercises(userId).pipe(
      map((userExercises) => {
        const userExercise = userExercises.find((userEx) => {
          return userEx.exercises.some((e) => e.exerciseId === exerciseId);
        });

        if (userExercise) {
          const exercise = userExercise.exercises.find((e) => e.exerciseId === exerciseId);
          return {
            exerciseId,
            reps: exercise.reps,
            sets: exercise.sets,
            amount: exercise.amount,
            ...exercise,
          };
        } else {
          return {
            exerciseId,
            reps: undefined,
            sets: undefined,
            amount: undefined,
          };
        }
      })
    );
  }

  getExerciseById(exerciseId: string) {
    return this.afs.doc(`exercises/${exerciseId}`).valueChanges();
  }

  clearUserExercises() {
    localStorage.removeItem('userExercises');
  }

  loadCompletedExercises(userId: string, dataAtual: string, listExercises: any[]) {
    this.afs.collection('completedExercises').doc(userId).valueChanges()
      .subscribe((completedExercises: any) => {
        //console.log('Dados da coleção "completedExercises":', completedExercises);

        if (completedExercises && completedExercises[dataAtual]) {
          const completedExercisesToday = completedExercises[dataAtual];
          this.updateCompletedExercises(completedExercisesToday, listExercises);
        }
      });
  }

  markCompletedExercises(userId: string, dataAtual: string, listExercises: any[]) {
    this.afs.collection('completedExercises').doc(userId).valueChanges()
      .subscribe((completedExercises: any) => {
        //console.log('Dados da coleção "completedExercises":', completedExercises);

        if (completedExercises && completedExercises[dataAtual]) {
          const completedExercisesToday = completedExercises[dataAtual];
          this.updateCompletedExercises(completedExercisesToday, listExercises);
        }
      });
  }

  private updateCompletedExercises(completedExercisesToday: any, listExercises: any[]) {
    listExercises.forEach((userExercise: any) => {
      userExercise.exercises.forEach((exercise: any) => {
        if (completedExercisesToday[exercise.exerciseId]) {
          exercise.completed = true;
          //console.log(`Exercício "${exercise.name}" concluído.`);
        }
      });
    });
  }

  async resetExercise(exerciseId: string, listExercises: any[]) {
    const dataAtual = new Date().toISOString().split('T')[0];
    console.log('Data atual:', dataAtual);
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Deseja reiniciar o exercício?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sim',
          cssClass: 'danger',
          handler: async () => {
            const user = await this.afAuth.currentUser;
            if (user) {
              const userId = user.uid;
              const docRef = this.afs.collection('completedExercises').doc(userId);

              docRef.get().subscribe((doc) => {
                if (doc.exists) {
                  const completedExercises = doc.data();
                  delete completedExercises[dataAtual][exerciseId];

                  docRef.set(completedExercises).then(() => {
                    listExercises.forEach((userExercise: any) => {
                      userExercise.exercises.forEach((exercise: any) => {
                        if (exercise.exerciseId === exerciseId) {
                          exercise.completed = false;
                        }
                      });
                    });

                    //console.log('Exercício reiniciado com sucesso.');

                    this.router.navigate(['/exercise', exerciseId]);
                  }).catch((error) => {
                    //console.error('Erro ao reiniciar o exercício:', error);
                  });
                }
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }
}

