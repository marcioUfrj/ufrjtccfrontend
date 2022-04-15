import React, { useContext } from 'react'
import { CanDoContext, ExerciseContext, ReportContext } from '../../pages/lessons'
import { Temporal } from '@js-temporal/polyfill'

const ReportContainer = () => {

  const { canDo } = useContext(CanDoContext)
  const { exercises } = useContext(ExerciseContext)
  const { report } = useContext(ReportContext)

  /* Função que calcula o total de acertos para cada exercicio */
  function totalAcertosExercicio(questions) {
    const accTotal = questions.reduce((total, question) => {
      const correct = question.answers.find(item => item.correct === true)
      const selected = report.answers.find(item => item.idQuestion === question._id)
      if (correct._id === selected.idAnswerSelected) return total = total + 1
      return total
    }, 0)

    return accTotal
  }

  function totalTempoExercicio(questions) {
    const firstAnswer = report.answers.find(item => item.idQuestion === questions[0]._id)
    const lastAnswer = report.answers.find(item => item.idQuestion === questions[questions.length-1]._id)
    
    const tempo = Temporal.PlainDateTime.from(lastAnswer.finalTime)
                  .since(Temporal.PlainDateTime.from(firstAnswer.initialTime))
                  .seconds
    //console.log(`tempo gasto: ${tempo}`)
    return tempo
  }

  return (
    <div className="container">
      <h2>{`Nível ${canDo.level}, ${canDo.name}`}</h2>
      {exercises.map((exercise, index) => (
        <div key={exercise._id}>
          <h3>{exercise.name}</h3>
          <div>{exercise.description}</div>
          <div>{`Total de acertos: ${totalAcertosExercicio(exercise.questions)} | ${exercise.questions.length}`}</div>
          <div>{`Tempo total: ${totalTempoExercicio(exercise.questions)}`}</div>
        </div>
      ))}
    </div>
  )
}

export default ReportContainer
