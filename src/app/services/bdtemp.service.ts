import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BdtempService {

  listExercises = [
    {
      id: 1,
      name: "Aquecimento",
      description: `
      <p>O aquecimento na esteira é crucial para preparar o corpo para o exercício. Você pode seguir estas etapas de 15 minutos:</p>
      <ul>
        <li>Caminhe levemente por 2-3 min.</li>
        <li>Aumente a velocidade por mais 2-3 min.</li>
        <li>Aumente a inclinação por mais 2-3 min.</li>
        <li>Acelere por mais 2-3 min.</li>
        <li>Caminhe novamente por 2-3 min para resfriar o corpo.</li>
      </ul>
      `,
      group: "Cardio",
      type: "tempo",
      amount: "15",
      image: "/assets/img/treino1.jpg",
      alt: "Esteira"
    },
    {
      id: 2,
      name: "Supino Reto",
      description: `
        <p>O Supino Reto é um exercício de musculação excelente para fortalecer o peitoral.</p>
        <p>Proceda da seguinte maneira:</p>
        <ol>
          <li>Deite-se em um banco reto com os pés apoiados no chão.</li>
          <li>Segure a barra com as mãos na largura dos ombros e abaixe-a até o peito.</li>
          <li>Empurre a barra de volta à posição inicial.</li>
        </ol>
      `,
      group: "Musculação",
      type: "repetições",
      amount: "3 séries de 10 repetições",
      image: "/assets/img/treino2.jpg",
      alt: "Supino Reto"
    },
    {
      id: 3,
      name: "Agachamento",
      description: `
        <p>O Agachamento é um exercício de musculação fundamental para fortalecer as pernas.</p>
        <p>Proceda da seguinte maneira:</p>
        <ol>
          <li>Fique em pé com os pés na largura dos ombros.</li>
          <li>Abaixe o corpo dobrando os joelhos até as coxas ficarem paralelas ao chão.</li>
          <li>Volte à posição inicial empurrando através dos calcanhares.</li>
        </ol>
      `,
      group: "Musculação",
      type: "repetições",
      amount: "3 séries de 12 repetições",
      image: "/assets/img/treino3.jpg",
      alt: "Agachamento"
    },
    {
      id: 4,
      name: "Leg Press",
      description: `
        <p>O Leg Press é um excelente exercício de musculação para fortalecer as pernas.</p>
        <p>Proceda da seguinte maneira:</p>
        <ol>
          <li>Sente-se no aparelho do Leg Press.</li>
          <li>Coloque os pés na plataforma na largura dos ombros.</li>
          <li>Empurre a plataforma com os pés até estendê-los completamente.</li>
          <li>Retorne lentamente à posição inicial.</li>
        </ol>
      `,
      group: "Musculação",
      type: "repetições",
      amount: "3 séries de 12 repetições",
      image: "/assets/img/treino4.jpg",
      alt: "Leg Press"
    },
    {
      id: 5,
      name: "Rosca Direta",
      description: `
        <p>A Rosca Direta é um exercício de musculação que visa fortalecer os músculos dos braços.</p>
        <p>Proceda da seguinte maneira:</p>
        <ol>
          <li>Fique em pé com os pés na largura dos ombros, segurando uma barra reta com as palmas viradas para cima.</li>
          <li>Mantenha os cotovelos colados ao corpo e levante a barra em direção ao peito.</li>
          <li>Baixe a barra de volta à posição inicial lentamente.</li>
        </ol>
      `,
      group: "Musculação",
      type: "repetições",
      amount: "3 séries de 12 repetições",
      image: "/assets/img/treino5.jpg",
      alt: "Rosca Direta"
    },
    {
      id: 6,
      name: "Puxada Alta",
      description: `
        <p>A Puxada Alta é um exercício de musculação eficaz para fortalecer os músculos das costas.</p>
        <p>Proceda da seguinte maneira:</p>
        <ol>
          <li>Sente-se no aparelho da Puxada Alta e segure a barra acima da cabeça com as palmas viradas para você.</li>
          <li>Puxe a barra em direção ao peito, mantendo os cotovelos flexionados.</li>
          <li>Retorne a barra à posição inicial controladamente.</li>
        </ol>
      `,
      group: "Musculação",
      type: "repetições",
      amount: "3 séries de 12 repetições",
      image: "/assets/img/treino6.jpg",
      alt: "Puxada Alta"
    },
    {
      id: 7,
      name: "Flexão de Pernas",
      description: `
        <p>A Flexão de Pernas é um exercício de musculação que visa fortalecer as pernas.</p>
        <p>Proceda da seguinte maneira:</p>
        <ol>
          <li>Deite-se de costas com as mãos apoiando o corpo na parte inferior das costas.</li>
          <li>Dobre os joelhos e levante os pés do chão.</li>
          <li>Estenda as pernas para cima o mais alto possível.</li>
          <li>Abaixe lentamente as pernas de volta à posição inicial.</li>
        </ol>
      `,
      group: "Musculação",
      type: "repetições",
      amount: "3 séries de 12 repetições",
      image: "/assets/img/treino7.jpg",
      alt: "Flexão de Pernas"
    }
  ];

  listUsers = [
    {
      id: 1,
      username: "Vitor",
      picture: "https://i.pinimg.com/1200x/33/7a/ca/337aca4d9c0c3182f7e863c11fec83a3.jpg",
      email: "vitinho123@gmail.com",
      password: "a"
    },
    {
      id: 2,
      username: "Daniel",
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0jdrL9uo6aP-ooUeDVnwmkBXSIZYHeVMBufy2HA1dhMAcvMg3dlVfwke1dcHabNSqjyw&usqp=CAU",
      email: "daniel@gmail.com",
      password: "b"
    },
    {
      id: 3,
      username: "Gabriel",
      picture: "https://i.pinimg.com/1200x/6b/e8/6e/6be86ee43bb016e3e04bdadbb121871f.jpg",
      email: "gabrielmata2@gmail.com",
      password: "c"
    },
    {
      id: 4,
      username: "a",
      picture: "https://static.vecteezy.com/ti/vetor-gratis/p3/16587988-fofo-jesus-cristo-com-personagem-de-desenho-animado-de-maos-abertas-personagem-chibi-desenhado-a-mao-clip-art-adesivo-fundo-branco-isolado-biblia-crista-para-criancas-ilustracao-de-arteial-de-icone-de-logotipo-de-mascote-vetor.jpg",
      email: "a",
      password: "a"
    }


  ]
  
  constructor() { }

  getExerciseById(id: string) {
    const exerciseId = parseInt(id, 10); // Convertemos o ID para um número inteiro

    const exercise = this.listExercises.find(exercise => exercise.id === exerciseId);

    return exercise;
  }

  obterUsuarios() {
    return this.listUsers;
  }
}
