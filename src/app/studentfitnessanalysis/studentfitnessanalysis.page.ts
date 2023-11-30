import { Component } from '@angular/core';

@Component({
  selector: 'app-studentfitnessanalysis',
  templateUrl: './studentfitnessanalysis.page.html',
  styleUrls: ['./studentfitnessanalysis.page.scss'],
})
export class StudentfitnessanalysisPage {
  aluno = {
    nome: 'Gabriel de Angelis Godoy',
    genero: 'Masculino',
    foto: 'assets/3135768.png',  // Substitua pela URL real da foto do aluno
    altura: 176, // Altura em centímetros
    peso: 76,   // Peso em quilogramas
  };

  categorias = [
    {
      nome: 'Treino de Peito:',
      treinos: [
        { nome: 'Treino 1 - Supino Reto', selecionado: false },
        { nome: 'Treino 2 - Supino Inclinado', selecionado: false },
        { nome: 'Treino 3 - Flyes com Halteres', selecionado: false },
      ],
      expandida: false,
    },
    {
      nome: 'Treinos de Pernas:',
      treinos: [
        { nome: 'Treino 1 - Agachamento Livre', selecionado: false },
        { nome: 'Treino 2 - Leg Press', selecionado: false },
        { nome: 'Treino 3 - Cárdio para Pernas (como corrida ou ciclismo)', selecionado: false },
      ],
      expandida: false,
    },
    {
      nome: 'Treino de Costas:',
      treinos: [
        { nome: 'Treino 1 - Barra Fixa', selecionado: false },
        { nome: 'Treino 2 - Puxada na Polia Alta', selecionado: false },
        { nome: 'Treino 3 - Remada Curvada', selecionado: false },
      ],
      expandida: false,
    },
    {
      nome: 'Treino de Ombros:',
      treinos: [
        { nome: 'Treino 1 - Desenvolvimento com Barra', selecionado: false },
        { nome: 'Treino 2 - Elevação Lateral com Halteres', selecionado: false },
        { nome: 'Treino 3 - Remada Alta', selecionado: false },
      ],
      expandida: false,
    },
    {
      nome: 'Treino de Bíceps:',
      treinos: [
        { nome: 'Treino 1 - Rosca Direta com Barra', selecionado: false },
        { nome: 'Treino 2 - Rosca Martelo com Halteres', selecionado: false },
        { nome: 'Treino 3 - Curl Concentrado', selecionado: false },
      ],
      expandida: false,
    },
    {
      nome: 'Treino de Tríceps:',
      treinos: [
        { nome: 'Treino 1 - Tríceps na Polia', selecionado: false },
        { nome: 'Treino 2 - Supino Fechado', selecionado: false },
        { nome: 'Treino 3 - Mergulho em Barras Paralelas', selecionado: false },
      ],
      expandida: false,
    },
    {
      nome: 'Treino de Core (Abdômen e Região Lombar):',
      treinos: [
        { nome: 'Treino 1 - Prancha Frontal', selecionado: false },
        { nome: 'Treino 2 - Crunches', selecionado: false },
        { nome: 'Treino 3 - Hiperextensão', selecionado: false },
      ],
      expandida: false,
    },
    {
      nome: 'Treino Cardiovascular:',
      treinos: [
        { nome: 'Treino 1 - Corrida de Intervalos', selecionado: false },
        { nome: 'Treino 2 - Ciclismo de Alta Intensidade', selecionado: false },
        { nome: 'Treino 3 - Treino HIIT com Corda de Pular', selecionado: false },
      ],
      expandida: false,
    },
  ];

  toggleCategoria(categoria) {
    categoria.expandida = !categoria.expandida;
  }

  calcularIMC(altura: number, peso: number): number {
    const alturaMetros = altura / 100;
    return peso / (alturaMetros * alturaMetros);
  }

  interpretarEstadoIMC(imc: number): string {
    if (imc < 18.5) {
      return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 24.9) {
      return 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
      return 'Sobrepeso';
    } else {
      return 'Obeso';
    }
  }

  enviarTreinos() {
    // Lógica para enviar treinos para o aluno
    console.log('Treinos enviados:', this.categorias);
    // Adicione aqui a lógica de envio para a API ou o que for necessário no seu aplicativo
  }
}
