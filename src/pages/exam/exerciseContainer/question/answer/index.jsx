import React, { useState, useEffect } from "react"
import { usePhaseContext, useAnswerSelectedContext, useModelsExamContext } from "../.."
import { phases } from "../../../../../constants/constants"

import { Temporal } from '@js-temporal/polyfill'

function Answer({ exercise, item }) {
  const { phase, setPhase } = usePhaseContext()
  const setAnswerSelected = useAnswerSelectedContext()
  const { modelsExam, setModelsExam } = useModelsExamContext()
  const [initialTime, setInitialTime] = useState(Temporal.Now.plainDateTimeISO())
  const [text, setText] = useState(item.idAnswer.text)
  
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

  function calculateModelsExam() {
    return modelsExam.map(model => {

      // CREATE INPUT ARRAY WITH FEATURES_DATABASECODES
      const inputs_names = model.encoding.map(encode => {
        if (encode === 'user')  return `user_${exercise[model['code_model']]}`
        if (encode === 'item')  return `item_${exercise[model['code_model']]}`
        if (encode === 'skill') return `skill_${exercise[model['code_model']]}`
        if (encode === 'wins')  return `wins_${exercise[model['code_model']]}`
        if (encode === 'fails') return `fails_${exercise[model['code_model']]}`
        if (encode === 'attempts') return `attempts_${exercise[model['code_model']]}`
      })

      // EXTRACT THE COEFS BY ENCODING
      const coefs = inputs_names.map(input_name => {
        return parseFloat(model.mapCoefs[input_name])
      })

      // UPDATE THE INPUT VALUES BY ENCODING AFTER USER'S ANSWER
      const new_inputs = inputs_names.reduce((accInputs, input_name) => {
          // if proporty is wins, fails; then update with score
          if(input_name.includes('wins_')) {
            accInputs[input_name] += item.correct
          }else if(input_name.includes('fails_')) {
            accInputs[input_name] += 1 - item.correct
          }else if(input_name.includes('attempts_')) {
            accInputs[input_name] += item.correct
          }

          return accInputs
        },
        {...model['inputs']}
      )

      // coefs[] * input[] => coefs[] * [skills, wins, fails]
      const vector_prod = inputs_names.map(input_name => {
        if (input_name.includes('user_') || input_name.includes('item_') || input_name.includes('skill_')) {
          return parseFloat(model.mapCoefs[input_name])
        }
        if (input_name.includes('wins_') || input_name.includes('fails_') || input_name.includes('attempts_')) {
          return parseFloat(model.mapCoefs[input_name]) * new_inputs[input_name]
        }
      })
      
      // CALCULATE THE INNER PRODUCT
      const inner_prod = vector_prod.reduce((acc, val) => {
          return acc + val
        },
        0
      )
      
      // CALCULATE THE MODEL'S PROBABILITY LOGIC FUNCTION
      const proba = 1 / ( 1 + Math.exp(-model['intercept'] - inner_prod))

      console.log(model['code_model'], ' coefs: ', coefs)
      console.log(model['code_model'], ' inner_prod: ', vector_prod)
      console.log(model['code_model'], ' proba: ', proba)
      console.log('--------------------------------------------------------------')
      
      return { ...model, 'inputs': new_inputs, 'proba': proba }
    })
  }

  function answerSelected() {
    // calculate the result from models and update the State
    const updated_models = calculateModelsExam()
    setModelsExam(updated_models)

    const finalTime = Temporal.Now.plainDateTimeISO()
    const score = item.correct === true ? 1 : 0
    setPhase(phases.ANSWER)
    setAnswerSelected(item.idAnswer._id, score, initialTime.toString(), finalTime.toString())
  }
  
  useEffect(() => {
    setText(item.idAnswer.text)
    setInitialTime(Temporal.Now.plainDateTimeISO())
  }, [item])


  return (
    <button className={classe} onClick={() => answerSelected()}>{text}</button>
  )
}

export default Answer