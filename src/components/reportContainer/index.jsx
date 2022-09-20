import React from 'react'
//import { useCanDoContext, useExerciseContext, useReportContext } from '../../pages/'
import { Temporal } from '@js-temporal/polyfill'
import { modelsThresholds } from '../../constants/constants'

const ReportContainer = ({ report, canDo, exercises }) => {

  //const { canDo } = useCanDoContext()
  //const { exercises } = useExerciseContext()
  //const { report } = useReportContext()

  function classifyUserByModel(probability, thresholds) {
    if ( thresholds['begginer'][0] <= probability && probability < thresholds['begginer'][1] ) {
      return 'Iniciante'
    } else if ( thresholds['intermediate'][0] <= probability && probability < thresholds['intermediate'][1] ) {
      return 'Intermediário'
    } else if ( thresholds['advanced'][0] <= probability && probability < thresholds['advanced'][1] ) {
      return 'Avançado'
    } else {
      return 'Probabilidade fora dos limites.'
    }
  }

  /* Função que calcula o total de acertos para cada exercicio */
  function totalAcertosExercicio(questions) {
    const accTotal = questions.reduce((total, question) => {
      const correct = question.answers.find(answer => answer.correct === true)
      const selected = report.answers.find(answer => answer.idQuestion === question.idQuestion)
      if (correct.idAnswer._id === selected.idAnswerSelected) return total = total + 1
      return total
    }, 0)

    return accTotal
  }

  function totalTempoExercicio(questions) {
    const firstAnswer = report.answers.find(answer => answer.idQuestion === questions[0].idQuestion)
    const lastAnswer = report.answers.find(answer => answer.idQuestion === questions[questions.length-1].idQuestion)
    
    const tempo = Temporal.PlainDateTime.from(lastAnswer.finalTime)
                  .since(Temporal.PlainDateTime.from(firstAnswer.initialTime))
                  .seconds
    //console.log(`tempo gasto: ${tempo}`)
    return tempo
  }

  return (
    <>
      <h2>{`Nível ${canDo.level}, ${canDo.name}`}</h2>
      {exercises.map((exercise, index) => (
        <div key={exercise._id}>
          <h3>{exercise.name}</h3>
          <div>{exercise.description}</div>
          <div>{`Total de acertos: ${totalAcertosExercicio(exercise.questions)} | ${exercise.questions.length}`}</div>
          <div>{`Tempo total: ${totalTempoExercicio(exercise.questions)}`}</div>
          <div>{`Modelo 1 - Proba: ${report.models_output[0]['proba']} - ${classifyUserByModel(report.models_output[0]['proba'], modelsThresholds[canDo.level])}`}</div>
          <div>{`Modelo 2 - Proba: ${report.models_output[1]['proba']} - ${classifyUserByModel(report.models_output[1]['proba'], modelsThresholds[canDo.level])}`}</div>
          <div>{`Modelo 3 - Proba: ${report.models_output[2]['proba']} - ${classifyUserByModel(report.models_output[2]['proba'], modelsThresholds[canDo.level])}`}</div>
        </div>
      ))}
    </>
  )
}

export default ReportContainer
