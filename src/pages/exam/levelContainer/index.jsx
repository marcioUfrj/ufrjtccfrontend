import React from 'react'
import { useLessonPhaseContext, useCanDoContext } from '../../' // pages/index.js

import { lessonPhases } from "../../../constants/constants"

function LevelContainer() {

  const setLessonPhase = useLessonPhaseContext()
  const { setCanDo } = useCanDoContext()

  function selectLevel(level) {
    setLessonPhase(lessonPhases.CANDO)
    setCanDo({ level: level })
  }

  /*
    <div className="container">
    </div>
  */
  return (
    <>
      <div>Lista de Níveis</div>
      <div className="btn-grid">
        <button className="btn btn-primary" onClick={() => selectLevel("A1")}>Nível A1</button>
      </div>
    </>
  )
}

export default LevelContainer