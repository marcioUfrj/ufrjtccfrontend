import React, { useContext } from "react"
import AnswerContainer from './answerContainer'
import { PhaseContext } from "../exerciseContainer"
import { phases } from "../../../constants/constants"

function Exercise({ exercise }) {
  const { phase }= useContext(PhaseContext)
  
  return (
    <div>
      {phase !== phases.PREPARATION ? <div>{exercise.question}</div> : <></>}
      {phase !== phases.PREPARATION ? <AnswerContainer answers={exercise.answers} /> : <></>}
    </div>
  )
}

export default Exercise