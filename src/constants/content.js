const content = [
  {
    question: "Qual o seu nome?",
    answers: [
      { text: "Eu sou Márcio.", 
        correct: true },
      { text: "Eu tenho 29 anos.", 
        correct: false },
      { text: "Eu sou brasileiro.", 
        correct: false },
      { text: "Eu sou estudante.", 
        correct: false }
    ]
  },
  {
    question: "Qual a sua idade?",
    answers: [
      { text: "Eu sou Márcio.", 
        correct: false },
      { text: "Eu tenho 29 anos.", 
        correct: true },
      { text: "Eu sou brasileiro.", 
        correct: false },
      { text: "Eu sou estudante.", 
        correct: false }
    ]
  }
]

export default content

/* EXERCICIOS EXEMPLO PARA CAN-DO */
export const exercises = [
  {
    index_val: 0,
    name: 'Cumprimentos Básicos - Formal',
    description: 'Você está na escola e cumprimenta seu professor.',
    questions: [
      {
        question: "Horário: 8:00 da manhã",
        answers: [
          { text: "Ohayou gozaimasu, sensei.", 
            correct: true },
          { text: "Konnichiha, sensei.", 
            correct: false },
          { text: "Konbanha, sensei.", 
            correct: false },
          { text: "Sayonara, sensei.", 
            correct: false }
        ]
      },
      {
        question: "Horário: 14:00 da tarde",
        answers: [
          { text: "Ohayou gozaimasu, sensei.", 
            correct: false },
          { text: "Konnichiha, sensei.", 
            correct: true },
          { text: "Konbanha, sensei.", 
            correct: false },
          { text: "Sayonara, sensei.", 
            correct: false }
        ]
      }
    ],
    cando_id: 2
  },
  {
    index_val: 0,
    name: 'Cumprimentos Básicos 2 - Formal',
    description: 'Situação de despedida no trabalho e cumprimento.',
    questions: [
      {
        question: "Seu companheiro de trabalho diz: Sayounara. Você diz:",
        answers: [
          { text: "Jaa, mata.", 
            correct: true },
          { text: "Osaki ni shitsureishimasu.", 
            correct: false },
          { text: "Konbanwa.", 
            correct: false },
          { text: "Arigatou gozaimasu.", 
            correct: false }
        ]
      },
      {
        question: "Você está saindo primeiro do trabalho e diz:",
        answers: [
          { text: "Jaa, mata.", 
            correct: false },
          { text: "Osaki ni shitsureishimasu.", 
            correct: true },
          { text: "Konbanwa.", 
            correct: false },
          { text: "Arigatou gozaimasu.", 
            correct: false }
        ]
      }
    ],
    cando_id: 1
  }
]

/* CAN-DO exemplo */
export const canDo = {
  number: 1,
  name: 'Trocar cumprimentos',
  lesson: 'Língua Japonesa',
  level: 'A1'
}

/* LISTA DE CAN-DOs*/
const canDo1 = {
  id: 1,
  number: 1,
  name: 'Trocar cumprimentos',
  lesson: 'Língua Japonesa',
  level: 'A1'
}

const canDo2 = {
  id: 2,
  number: 2,
  name: 'Usar expressões básicas de sala de aula',
  lesson: 'Você poderia repetir?',
  level: 'A1'
}

const canDo3 = {
  id: 3,
  number: 3,
  name: 'Usar expressões básicas de sala de aula',
  lesson: 'Escrever o seu nome e o seu país em japonês',
  level: 'A2'
}

export const canDos = [
  canDo1,
  canDo2,
  canDo3
]
