import React, { useContext, useState, useEffect } from "react"
import { PhaseContext, AnswerSelectedContext } from "../../exerciseContainer"
import { phases } from "../../../../constants/constants"

import { Temporal } from '@js-temporal/polyfill'

function Answer({ item }) {
  const { phase, setPhase } = useContext(PhaseContext)
  const setAnswerSelected = useContext(AnswerSelectedContext)
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
    setPhase(phases.ANSWER)
    setAnswerSelected(item._id, initialTime.toString(), finalTime.toString())
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