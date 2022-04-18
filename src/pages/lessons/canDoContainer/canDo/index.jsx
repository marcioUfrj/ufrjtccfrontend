import React, { useState, useEffect } from 'react'
import  { useLessonPhaseContext, useCanDoContext, useReportContext } from '../../../'
import { lessonPhases } from "../../../../constants/constants"

function CanDo({ item }) {
  const setLessonPhase = useLessonPhaseContext()
  const { setReport } = useReportContext()
  const { setCanDo } = useCanDoContext()
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