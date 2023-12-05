import { Component  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, AlertController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user: User;
  userData: any;
  loading: HTMLIonLoadingElement;
  exibir: boolean = false;
  imageLoaded: boolean = false;
  presentingElement = null;
  altura: number;
  peso: number;
  imcResultado: number;
  classificacao: string;
  public actionSheetButtons = [
    {
      text: 'Altura',
      role: 'destructive',
      handler: () => {
        this.showInput('altura');
      },
    },
    {
      text: 'Peso',
      handler: () => {
        this.showInput('peso');
      },
    },
    {
      text: 'Sair',
      role: 'cancel',
      handler: () => {
        this.performAction('cancel');
      },
    },
  ];


  async showInput(type: string) {
    const alert = await this.alertController.create({
      header: (type === 'peso' ? 'Informe seu ' : 'Informe sua ') + type,
      inputs: [
        {
          name: type,
          type: 'number',
          placeholder: (type === 'peso' ? 'Digite seu ' : 'Digite sua ') + type,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.performAction(type, data[type]);
          },
        },
      ],
    });
    await alert.present();
  }



  performAction(action: string, value?: number) {
    if (action === 'altura') {
      this.altura = value;
    } else if (action === 'peso') {
      this.peso = value;
      this.calcularIMC();
      this.showIMCResult();
    } else {
      // Lógica para outras ações, se necessário
    }
  }
  // Simule dados de treinos concluídos
  treinosConcluidos = [
    { dia: 1 },
    { dia: 2 },
    { dia: 3 },
    // Adicione mais dias conforme necessário
  ];

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.userData = {};
    this.loadUserData();
    this.presentingElement = document.querySelector('.ion-page');
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

  // Método para calcular o IMC
  calcularIMC() {
    if (this.altura && this.peso) {
      this.imcResultado = this.peso / (this.altura * this.altura);
      this.classificacao = this.getClassificacao(this.imcResultado);
    } else {
      // Adicione lógica para lidar com entrada inválida, se necessário
    }
  }

  async showIMCResult() {
    const formattedIMC = this.formatarNumero(this.imcResultado);
    const classification = this.classificacao;

    const alert = await this.alertController.create({
      header: 'Resultado do IMC',
      message: `Seu IMC é ${formattedIMC} (${classification}).`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  formatarNumero(numero: number): string {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }


  getClassificacao(imc: number): string {
    if (imc < 18.5) {
      return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc <= 24.99) {
      return 'Peso normal';
    } else if (imc >= 25 && imc <= 29.99) {
      return 'Sobrepeso';
    } else if (imc >= 30 && imc <= 34.99) {
      return 'Obesidade Grau 1';
    } else if (imc >= 35 && imc <= 39.99) {
      return 'Obesidade Grau 2';
    } else {
      return 'Obesidade Grau 3';
    }
  }


  // Função para formatar a data no formato 'dd/MM/yyyy'
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

