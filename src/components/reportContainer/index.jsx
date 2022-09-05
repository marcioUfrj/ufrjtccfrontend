import React from 'react'
//import { useCanDoContext, useExerciseContext, useReportContext } from '../../pages/'
import { Temporal } from '@js-temporal/polyfill'

const ReportContainer = ({ report, canDo, exercises }) => {

  //const { canDo } = useCanDoContext()
  //const { exercises } = useExerciseContext()
  //const { report } = useReportContext()

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
        </div>
      ))}
    </>
  )
}

export default ReportContainer
