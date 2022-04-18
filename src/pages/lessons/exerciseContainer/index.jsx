import React, { useState, useEffect, createContext, useContext } from 'react'
import Exercise from "./exercise";
import { useUserContext } from '../../../components/'
import { useLessonPhaseContext, useCanDoContext, useExerciseContext, useReportContext } from "../../" // pages/index.js

import axios from 'axios'

import { phases, lessonPhases } from "../../../constants/constants"

const PhaseContext = createContext()
const AnswerSelectedContext = createContext()
export function usePhaseContext() { return useContext(PhaseContext)}
export function useAnswerSelectedContext() { return useContext(AnswerSelectedContext)}

function ExerciseContainer() {
  
  /* CONTROLLER */
  const setLessonPhase = useLessonPhaseContext()
  const { canDo } = useCanDoContext()
  const { exercises, setExercises } = useExerciseContext()
  const { report, setReport } = useReportContext()
  const { user } = useUserContext()
  
  const baseURL = `http://localhost:4000/exercises/ByCanDo/${canDo._id}`
  const getURL = "http://localhost:4000/reports/"
  
  /* PHASE */
  const [phase, setPhase] = useState(phases.PREPARATION)

  const [indExercise, setIndExercise] = useState(0)
  const [indQuestion, setIndQuestion] = useState(0)
  const [endExercise, setEndExercise] = useState(false)

  /* Funcao que consulta os dados no Backend */
  useEffect(() => {
    async function getExercises() {
      const response = await axios.get(baseURL)
      setExercises(response.data)
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

  /* Funcao que verifica se eh o final de Can-Do e se o usuario ja respondeu a pergunta */
  useEffect(() => {
    if (!exercises) return null
    //console.log(`indice:${indExercise} | length -1: ${exercises.length - 1} | phase: ${phase}`)
    if (endExercise && indExercise === exercises.length - 1 && phase === phases.ANSWER) {
      console.log('entrou no if')
      setPhase(phases.END)
    }
  }, [indExercise, phase, endExercise, exercises])

  /* Funcao que verifica se eh o final das questoes do exercicio */
  useEffect(() => {
    if (!exercises) return null
    if (indQuestion + 1 === exercises[indExercise].questions.length ) {
      setEndExercise(true)
    }
  }, [indQuestion, indExercise, exercises])

  function setAnswerSelected (idAnswer, initialTime, finalTime) {
    setReport({ 
      idCanDo: report.idCanDo,
      answers: [...report.answers, {
          idAnswerSelected: idAnswer,
          idQuestion: exercises[indExercise].questions[indQuestion]._id,
          idExercise: exercises[indExercise]._id,
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
          const response = await axios.post(getURL, {...report, idUser: user._id})
          setReport(response.data)
        }
          
        setLessonPhase(lessonPhases.REPORT)
      } catch (err) {
        console.log(err)
      }
    }
    saveReport()
  }

  if (!exercises) return null
  
  return (
    <PhaseContext.Provider value={{ phase, setPhase }}>
      <AnswerSelectedContext.Provider value={ setAnswerSelected }>
        <div className="container">
          <h2>{`Nível ${canDo.level}, ${canDo.name}`}</h2>
          <div>{exercises[indExercise].name}</div>
          <div>{exercises[indExercise].description}</div>
          <Exercise exercise={exercises[indExercise].questions[indQuestion]} />
          <div className="controls">
            { phase === phases.PREPARATION ? <button className="btn btn-primary" onClick={() => setPhase(phases.WAIT)}>Começar exercício</button> : <></>}
            <button className="btn btn-primary btn-l-margin" onClick={() => skipExercise()}>{skipText}</button>
            {!endExercise ? <button className="btn btn-primary btn-l-margin" onClick={() => nextQ()}>Próxima questão</button> : <></>}
            { phase === phases.END ? <button className="btn btn-primary btn-l-margin" onClick={() => generateReport()}>Relatório</button> : <></>}
          </div>
        </div>
      </AnswerSelectedContext.Provider>
    </PhaseContext.Provider>
  )
}

export default ExerciseContainer