import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-first-introduction',
  templateUrl: './first-introduction.page.html',
  styleUrls: ['./first-introduction.page.scss']
})
export class FirstIntroductionPage {
  constructor(
    public modalController: ModalController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.registrarData(user.uid); // Chamada da função registrarData com o uid do usuário autenticado
        this.registrarHorarioNotificacao(user.uid);
      }
    });
  }

  async registrarData(userId: string) {
    // Verifique se o userId está definido antes de continuar
    if (!userId) {
      console.error('ID do usuário não fornecido.');
      return;
    }

    try {
      const userDoc = this.firestore.collection('users').doc(userId).get();
      userDoc.pipe(
        map((snapshot) => {
          const userData = snapshot.data() as { registrationDate?: Date }; // Definindo o tipo esperado
          if (userData && userData.registrationDate) {
            console.log('registrationDate já existe. Não é necessário atualizar.');
            return; // Se registrationDate já existe, pare a execução da função
          }

          const dataAtual = new Date();
          return this.firestore.collection('users').doc(userId).update({
            registrationDate: dataAtual
          }).then(() => {
            console.log('Data registrada com sucesso:', dataAtual);
            // Redirecionar ou fazer qualquer outra coisa após registrar a data
          });
        })
      ).subscribe();
    } catch (error) {
      console.error('Erro ao registrar a data:', error);
    }
  }

  async registrarHorarioNotificacao(userId: string) {
    // Verifique se o userId está definido antes de continuar
    if (!userId) {
      console.error('ID do usuário não fornecido.');
      return;
    }

    try {
      const userDoc = this.firestore.collection('userNotifications').doc(userId).get();
      userDoc.pipe(
        map((snapshot) => {
          const userNotifications = snapshot.data() as { notifications?: any[] }; // Definindo o tipo esperado
          if (!userNotifications || !userNotifications.notifications) {
            console.error('Estrutura de notificações não encontrada.');
            return;
          }

          const welcomeNotification = userNotifications.notifications.find(notification => notification.type === 'welcome');

          if (welcomeNotification && !welcomeNotification.time) {
            const dataAtual = new Date();
            const horaAtual = `${dataAtual.getHours()}:${dataAtual.getMinutes() < 10 ? '0' : ''}${dataAtual.getMinutes()}`;

            welcomeNotification.time = horaAtual;

            return this.firestore.collection('userNotifications').doc(userId).update({
              notifications: userNotifications.notifications
            }).then(() => {
              console.log('Horário de notificação de boas-vindas registrado com sucesso:', horaAtual);
              // Redirecionar ou fazer qualquer outra coisa após registrar o horário da notificação
            });
          } else {
            console.log('Horário de notificação de boas-vindas já existe ou a notificação de boas-vindas não foi encontrada.');
            return;
          }
        })
      ).subscribe();
    } catch (error) {
      console.error('Erro ao registrar o horário da notificação:', error);
    }
  }


}
