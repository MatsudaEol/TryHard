import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.userData = {};
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.user = user;
        const userUID = user.uid;

        try {
          this.userData = await this.userService.getUser(userUID);

          // Converte o Timestamp da data de nascimento em uma representação de data legível
          if (this.userData.birth) {
            this.userData.birth = this.formatDate(this.userData.birth.toDate());
          }
        } catch (error) {
          console.error('Erro ao buscar informações do usuário:', error);
        }
      }
    });
  }

  // Função para formatar a data no formato 'dd/MM/yyyy'
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
