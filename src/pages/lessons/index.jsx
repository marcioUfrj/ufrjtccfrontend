import React, { useState, createContext, useContext } from 'react'
import { ExerciseContainer, CanDoContainer, LevelContainer } from "../";
import { ReportContainer } from "../../components/";

import { lessonPhases } from "../../constants/constants"

const LessonPhaseContext = createContext()
const CanDoContext = createContext()
const ExerciseContext = createContext()
const ReportContext = createContext()

export function useLessonPhaseContext() { return useContext(LessonPhaseContext)}
export function useCanDoContext() { return useContext(CanDoContext)}
export function useExerciseContext() { return useContext(ExerciseContext)}
export function useReportContext() { return useContext(ReportContext)}


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