import React, { useState, createContext } from 'react'
import ExerciseContainer from "./exerciseContainer";
import CanDoContainer from "./canDoContainer";
import LevelContainer from "./levelContainer";
import ReportContainer from "../../components/reportContainer";

import { lessonPhases } from "../../constants/constants"

export const LessonPhaseContext = createContext()
export const CanDoContext = createContext()
export const ExerciseContext = createContext()
export const ReportContext = createContext()

function LessonContainer() {

  const [lessonPhase, setLessonPhase] = useState(lessonPhases.LEVEL)
  const [canDo, setCanDo] = useState('')
  const [exercises, setExercises] = useState(null)
  const [report, setReport] = useState({ idCanDo: '', answers: [] })
  
  let container
  switch (lessonPhase) {
    case  lessonPhases.LEVEL:
      container = <LevelContainer />
      break
    case lessonPhases.CANDO:
      container = <CanDoContainer />
      break
    case lessonPhases.EXERCISE:
      container = <ExerciseContainer />
      break
    case lessonPhases.REPORT:
      container = <ReportContainer />
      break
    default:
      container = <div>Nenhuma fase válida encontrada</div>
      break
  }

  return (
    <LessonPhaseContext.Provider value={setLessonPhase}>
      <CanDoContext.Provider value={{ canDo, setCanDo }}>
        <ExerciseContext.Provider value={{ exercises, setExercises }}>
          <ReportContext.Provider value={{ report, setReport }}>
            {container}
          </ReportContext.Provider>
        </ExerciseContext.Provider>
      </CanDoContext.Provider>
    </LessonPhaseContext.Provider>
  )
}

export default LessonContainer