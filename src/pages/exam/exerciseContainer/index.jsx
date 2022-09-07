import React, { useState, useEffect, createContext, useContext } from 'react'
import QuestionContainer from "./question";
import { useUserContext } from '../../../components/'
import { useLessonPhaseContext, useCanDoContext, useExerciseContext, useReportContext } from "../../" // pages/index.js

import { createReport, getPolulatedExercisesByCanDo, getActiveModels } from '../../../services/'

import { phases, lessonPhases } from "../../../constants/constants"

const PhaseContext = createContext()
const AnswerSelectedContext = createContext()
const ModelsExamContext = createContext()
export function usePhaseContext() { return useContext(PhaseContext)}
export function useAnswerSelectedContext() { return useContext(AnswerSelectedContext)}
export function useModelsExamContext() { return useContext(ModelsExamContext)}

function createInputsObject(input={}){
  let inputs = {}
  for (let i in input) {
    inputs[i] = 0
  }

  return inputs
}

function ExerciseContainer() {
  
  /* CONTROLLER */
  const setLessonPhase = useLessonPhaseContext()
  const { canDo } = useCanDoContext()
  const { exercises, setExercises } = useExerciseContext()
  const { report, setReport } = useReportContext()
  const { user } = useUserContext()
  
  /* PHASE */
  const [phase, setPhase] = useState(phases.PREPARATION)

  const [indExercise, setIndExercise] = useState(0)
  const [indQuestion, setIndQuestion] = useState(0)
  const [endExercise, setEndExercise] = useState(false)
  const [modelsExam, setModelsExam] = useState([])

  /* Funcao que consulta os dados no Backend */
  useEffect(() => {
    async function getExercises() {
      const response = await getPolulatedExercisesByCanDo({ idCanDo: canDo._id })
      setExercises(response)
      const response2 = await getActiveModels()
      
      const models_adj = response2.map(model => {
        //console.log(model['mapCoefs'])
        const inputs = createInputsObject(model['mapCoefs'])
        return { ...model, 'inputs': inputs, 'proba': 0 }
    })
    
     setModelsExam(models_adj)
    }
    getExercises()
  }, [])
  
  const skipText = !endExercise ? "Pular exercício" : "Próximo exercício"

  /* Funcao que avanca para o proximo exercicio dentro do Can-Do */
  function skipExercise() {
    if (!exercises) return null
    if (indExercise + 1 < exercises.length) {
      setIndExercise(indExercise + 1)
      setEndExercise(false)
      setIndQuestion(0)
      setPhase(phases.PREPARATION)
    }
  }

  /* Funcao que incrementa o indice da questao */
  function nextQuestion() {
    if (!exercises) return null
    if (indQuestion + 1 < exercises[indExercise].questions.length ) {
      setIndQuestion(indQuestion + 1)
    }
  }
  
  /* Funcao que avanca de questao e ajusta a PHASE */
  function nextQ() {
    nextQuestion()
    setPhase(phases.WAIT)
  }

  const nothing = () => {
  }
  /* Funcao que verifica se eh o final de Can-Do e se o usuario ja respondeu a pergunta */
  useEffect(() => {
    if (!exercises) return nothing
    //console.log(`indice:${indExercise} | length -1: ${exercises.length - 1} | phase: ${phase}`)
    if (endExercise && indExercise === exercises.length - 1 && phase === phases.ANSWER) {
      console.log('entrou no if')
      setPhase(phases.END)
    }
  }, [indExercise, phase, endExercise, exercises])

  /* Funcao que verifica se eh o final das questoes do exercicio */
  useEffect(() => {
    if (!exercises) return nothing
    if (indQuestion + 1 === exercises[indExercise].questions.length ) {
      setEndExercise(true)
    }
  }, [indQuestion, indExercise, exercises])

  function setAnswerSelected (idAnswer, score, initialTime, finalTime) {
    setReport({ 
      idCanDo: report.idCanDo,
      answers: [...report.answers, {
          idAnswerSelected: idAnswer,
          idQuestion: exercises[indExercise].questions[indQuestion].idQuestion,
          idExercise: exercises[indExercise]._id,
          score: score,
          initialTime: initialTime,
          finalTime: finalTime
        }
      ]
    })
  }
  
  function generateReport() {
    async function saveReport() {
      try {
        if (user !== null) {
          const response = await createReport({...report, idUser: user._id})
          setReport(response)
        }
        setLessonPhase(lessonPhases.REPORT)
      } catch (err) {
        console.log(err)
      }
    }
    saveReport()
  }

  if (!exercises) return null
  
  /*
        <div className="container">
        </div>
  */

  return (
    <PhaseContext.Provider value={{ phase, setPhase }}>
      <AnswerSelectedContext.Provider value={ setAnswerSelected }>
        <ModelsExamContext.Provider value={ { modelsExam, setModelsExam } }>
          <>
            <div className="lesson-name"><h2>{`Nível ${canDo.level}, ${canDo.name}`}</h2></div>
            <div className="exercise-name"><p>{exercises[indExercise].name}</p></div>
            <div className="exercise-description"><p>{exercises[indExercise].description}</p></div>
            <QuestionContainer exercise={exercises[indExercise].questions[indQuestion]} />
            <div className="controls">
              { phase === phases.PREPARATION ? <button className="btn btn-primary" onClick={() => setPhase(phases.WAIT)}>Começar exercício</button> : <></>}
              <button className="btn btn-primary btn-l-margin" onClick={() => skipExercise()}>{skipText}</button>
              {!endExercise ? <button className="btn btn-primary btn-l-margin" onClick={() => nextQ()}>Próxima questão</button> : <></>}
              { phase === phases.END ? <button className="btn btn-primary btn-l-margin" onClick={() => generateReport()}>Relatório</button> : <></>}
            </div>
          </>
        </ModelsExamContext.Provider>
      </AnswerSelectedContext.Provider>
    </PhaseContext.Provider>
  )
}

export default ExerciseContainer