import React, { useState, useContext, useEffect } from 'react'
import  { LessonPhaseContext, CanDoContext, ReportContext } from '../../'
import { lessonPhases } from "../../../../constants/constants"

function CanDo({ item }) {
  const setLessonPhase = useContext(LessonPhaseContext)
  const { setReport } = useContext(ReportContext)
  const { setCanDo } = useContext(CanDoContext)
  const [inCanDo, setInCando] = useState(item)
  
  function selectCanDo() {
    setLessonPhase(lessonPhases.EXERCISE)
    setCanDo(inCanDo)
    setReport({ idCanDo: inCanDo._id, answers: [] })
  }

  useEffect(() => {
    setInCando(item)
  }, [item])

  return (
    <button className="btn btn-primary" onClick={() => selectCanDo()}>
      {`${inCanDo.lesson} | ${inCanDo.name}`}
    </button>
  )
}

export default CanDo