import React, { useState, useEffect } from "react"
import { usePhaseContext, useAnswerSelectedContext } from "../.."
import { phases } from "../../../../../constants/constants"

import { Temporal } from '@js-temporal/polyfill'

function Answer({ item }) {
  const { phase, setPhase } = usePhaseContext()
  const setAnswerSelected = useAnswerSelectedContext()
  const [initialTime, setInitialTime] = useState(Temporal.Now.plainDateTimeISO())
  const [text, setText] = useState(item.text)
  
  let classe

  if (phase === phases.WAIT || phase === phases.PREPARATION) {
    classe = "btn btn-primary"
  }

  if ((phase === phases.ANSWER || phase === phases.END) && item.correct === true) {
    classe = "btn btn-correct"
  }

  if ((phase === phases.ANSWER || phase === phases.END)  && item.correct === false) {
    classe = "btn btn-wrong"
  }

  function answerSelected() {
    const finalTime = Temporal.Now.plainDateTimeISO()
    const score = item.correct === true ? 1 : 0
    setPhase(phases.ANSWER)
    setAnswerSelected(item._id, score, initialTime.toString(), finalTime.toString())
  }
  
  useEffect(() => {
    setText(item.text)
    setInitialTime(Temporal.Now.plainDateTimeISO())
  }, [item])


  return (
    <button className={classe} onClick={() => answerSelected()}>{text}</button>
  )
}

export default Answer