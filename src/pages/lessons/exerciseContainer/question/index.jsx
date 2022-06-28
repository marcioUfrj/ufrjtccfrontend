import React from "react"
import AnswerContainer from './answerContainer'
import { usePhaseContext } from "../../.."
import { phases } from "../../../../constants/constants"

function QuestionContainer({ exercise }) {
  const { phase }= usePhaseContext()
  
  return (
    <div>
      <br></br>
      {phase !== phases.PREPARATION ? <div>{exercise.question}</div> : <></>}
      {phase !== phases.PREPARATION ? <AnswerContainer answers={exercise.answers} /> : <></>}
    </div>
  )
}

export default QuestionContainer