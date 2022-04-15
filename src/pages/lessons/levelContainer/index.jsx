import React, { useContext } from 'react'
import { LessonPhaseContext, CanDoContext } from '../'

import { lessonPhases } from "../../../constants/constants"

function LevelContainer() {

  const setLessonPhase = useContext(LessonPhaseContext)
  const { setCanDo } = useContext(CanDoContext)

  function selectLevel(level) {
    setLessonPhase(lessonPhases.CANDO)
    setCanDo({ level: level })
  }

  return (
    <div className="container">
      <div>Lista de Níveis</div>
      <div className="btn-grid">
        <button className="btn btn-primary" onClick={() => selectLevel("A1")}>Nível A1</button>
        <button className="btn btn-primary" onClick={() => selectLevel("B1")}>Nível B1</button>
      </div>
    </div>
  )
}

export default LevelContainer