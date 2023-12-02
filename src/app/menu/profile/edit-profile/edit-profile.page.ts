import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {


  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private loadingController: LoadingController,
    private authService: AuthenticationService
  ) { }

  user: User;
  userData: any;
  loading: HTMLIonLoadingElement;
  exibir: boolean = false;
  imageLoaded: boolean = false;

  ngOnInit() {
  }

  async loadUserData() {
    this.loading = await this.loadingController.create({
      message: 'Carregando...',
      translucent: true,
    });

    await this.loading.present();

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

        const image = new Image();
        image.src = this.userData.profile || 'https://firebasestorage.googleapis.com/v0/b/tryhard-75312.appspot.com/o/default_profile.png?alt=media&token=a65958d7-167d-4e30-9391-4f92c26366aa';
        image.onload = () => {
          this.imageLoaded = true;

          // Verifique se todos os dados e a imagem foram carregados antes de exibir o conteúdo
          if (this.imageLoaded && this.userData.username && this.userData.email && this.userData.birth && this.userData.phone) {
          }
        };
      }
      this.loading.dismiss();
      this.exibir = true;
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
