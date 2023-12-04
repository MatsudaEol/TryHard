import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

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

  percent = 0;

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

  dataAtual(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa do zero, por isso o +1
    const year = String(now.getFullYear());

    return `${year}-${month}-${day}`;
  }

  async resetExercise(exerciseId: string, listExercises: any[]) {

    console.log('Data atual legal:', this.dataAtual());
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
                  delete completedExercises[this.dataAtual()][exerciseId];

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

  async removeExercise(exerciseId: string, listExercises: any[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.currentUser.then(async (user) => {
        if (user) {
          const userId = user.uid;
          const docRef = this.afs.collection('completedExercises').doc(userId);

          docRef.get().subscribe((doc) => {
            if (doc.exists) {
              const completedExercises = doc.data();
              if (completedExercises[this.dataAtual()] && completedExercises[this.dataAtual()][exerciseId]) {
                delete completedExercises[this.dataAtual()][exerciseId];

                docRef.set(completedExercises).then(() => {
                  listExercises.forEach((userExercise: any) => {
                    userExercise.exercises.forEach((exercise: any) => {
                      if (exercise.exerciseId === exerciseId) {
                        exercise.completed = false;
                      }
                    });
                  });
                  resolve(true); // Resolvendo como true se o exercício foi removido com sucesso
                }).catch((error) => {
                  reject(false); // Rejeitando em caso de erro
                });
              } else {
                resolve(false); // Resolvendo como false se o exercício não foi encontrado
              }
            } else {
              resolve(false); // Resolvendo como false se o documento não existe
            }
          });
        }
      });
    });
  }

  async completeExercise(userId: string, exerciseData: any) {
    if (!userId || !exerciseData) {
      console.error('Dados de usuário ou exercício ausentes.');
      return;
    }


    try {
      const exerciseDetails = await this.afs.collection('userExercises')
        .doc(userId).get().toPromise();

      const userExercises = exerciseDetails.data();

      if (userExercises && Array.isArray(userExercises['exercises'])) {
        const exerciseToComplete = userExercises['exercises'].find((exercise: any) =>
          exercise.exerciseId === exerciseData.exerciseId);

        if (exerciseToComplete) {
          let completedExerciseData: any = {
            name: exerciseData.name,
            // Other common exercise details can go here
          };

          if ('amount' in exerciseToComplete) {
            completedExerciseData.amount = exerciseToComplete.amount || '0';
          } else if ('reps' in exerciseToComplete && 'sets' in exerciseToComplete) {
            completedExerciseData.reps = exerciseToComplete.reps || '0';
            completedExerciseData.sets = exerciseToComplete.sets || '0';
          }

          await this.afs.collection('completedExercises').doc(userId).set({
            [this.dataAtual()]: {
              [exerciseData.exerciseId]: completedExerciseData,
            },
          }, { merge: true });

          console.log('Exercício completo adicionado à coleção completedExercises!');
          await this.checkAndSendNotification(userId);
        } else {
          console.error('Detalhes do exercício não encontrados para o usuário.');
        }
      } else {
        console.error('Dados de exercício não encontrados para o usuário ou formato inválido.');
      }
    } catch (error) {
      console.error('Erro ao adicionar exercício completo:', error);
    }
  }


  calculateCompletionPercentage(userId: string) {
    return combineLatest([
      this.afs.collection('userExercises', (ref) => ref.where('userId', '==', userId)).valueChanges(),
      this.afs.collection('completedExercises').doc(userId).valueChanges()
    ]).pipe(
      switchMap(([userExercises, completedExercises]: [any[], any]) => {

        let totalExercises = 0;
        let completedCount = 0;

        if (userExercises && completedExercises && completedExercises[this.dataAtual()]) {
          const completedExerciseIds = Object.keys(completedExercises[this.dataAtual()]);

          userExercises.forEach((userExercise: any) => {
            userExercise.exercises.forEach((exercise: any) => {
              totalExercises++;

              if (completedExerciseIds.includes(exercise.exerciseId)) {
                completedCount++;
              }
            });
          });
        }

        const completionPercentage = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;
        const roundedPercentage = Math.round(completionPercentage); // Arredondando a porcentagem

        this.percent = roundedPercentage

        console.log(`Porcentagem de exercícios completos (Round): ${this.percent}%`);
        return of(roundedPercentage);
      })
    );
  }

  private async checkAndSendNotification(userId: string) {
    if (this.percent === 100) {
      this.sendNotification(userId);
    }
  }

  sendNotification(userId: string) {
    const notificationId = this.afs.createId();
    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newNotification = {
      time: formattedTime,
      notificationId: notificationId,
      title: "Parabéns",
      content: "Você completou seu treino, tenha um bom descanso!"
    };

    this.afs.collection('userNotifications').doc(userId).get().subscribe((doc: any) => {
      if (doc.exists) {
        const notifications = doc.data().notifications || []; // Obter notificações existentes ou um array vazio

        notifications.push(newNotification); // Adicionar a nova notificação ao array

        this.afs.collection('userNotifications').doc(userId).update({ notifications: notifications })
          .then(() => {
            console.log('Notificação adicionada para o usuário', userId);
          })
          .catch((error: any) => {
            console.error('Erro ao adicionar notificação:', error);
          });
      } else {
        // Se o documento não existir, crie um novo com a notificação
        this.afs.collection('userNotifications').doc(userId).set({ notifications: [newNotification] })
          .then(() => {
            console.log('Notificação criada para o usuário', userId);
          })
          .catch((error: any) => {
            console.error('Erro ao criar notificação:', error);
          });
      }
    });
  }

}

