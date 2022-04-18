import React from "react"
import AnswerContainer from './answerContainer'
import { usePhaseContext } from "../../../"
import { phases } from "../../../../constants/constants"

function Exercise({ exercise }) {
  const { phase }= usePhaseContext()
  
  return (
    <div>
      {phase !== phases.PREPARATION ? <div>{exercise.question}</div> : <></>}
      {phase !== phases.PREPARATION ? <AnswerContainer answers={exercise.answers} /> : <></>}
    </div>
  )
}

export default Exercise