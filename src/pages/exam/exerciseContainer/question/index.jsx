import React from "react"
import AnswerContainer from './answerContainer'
import { usePhaseContext } from "../../.."
import { phases } from "../../../../constants/constants"

function QuestionContainer({ exercise }) {
  const { phase }= usePhaseContext()
  
  return (
    <div>
      {phase !== phases.PREPARATION ? <div className="japanese-text">{exercise.question}</div> : <></>}
      {phase !== phases.PREPARATION ? <AnswerContainer answers={exercise.answers} exercise={exercise}/> : <></>}
    </div>
  )
}

export default QuestionContainer