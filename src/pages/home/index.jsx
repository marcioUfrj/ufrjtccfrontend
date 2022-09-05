import React, { useState } from 'react'
import UserContainer from './profile'
import { ReportContainer, useUserContext } from '../../components/'
import { getPopulatedReportById, getReportsByUser, getReports, getExercisesById, getCanDosById } from '../../services/'

import { questionIds } from '../../constants/constants'

import { Temporal } from '@js-temporal/polyfill'
import { CSVLink } from 'react-csv'


const HomeContainer = () => {
  // Controller
  const { user } = useUserContext()

  // States
  const [canDo, setCanDo] = useState('')
  const [exercises, setExercises] = useState(null)
  const [report, setReport] = useState('')
  const [dataCsv, setDataCsv] = useState([])

  let container
  report !== '' ? container = <ReportContainer report={report} canDo={canDo} exercises={exercises} /> : container = <div></div>

  function printData() {
    if (report !== '' && canDo !== '' && exercises !== null) {
      report.answers.forEach((item) => {
        const tempo = Temporal.PlainDateTime.from(item.finalTime)
        .since(Temporal.PlainDateTime.from(item.initialTime))
        .seconds
        console.log(`${user._id};${user.nivelCEFR};${user.nivelJLPT};${user.nivelShirai};${report.idCanDo};${item.idAnswerSelected};${item.score};${tempo}`)
      })
    }
  }


  const createQuestionsModelIds = (reports) => {
    let questionIds = []
    reports.forEach((iReport) => {
      questionIds = questionIds.concat(
                      iReport.answers.map(item => {
                        return item.idQuestion
                      })
                    )
    })

    const t = [...new Set(questionIds)].map((item, index) => {
      return [item, index + 1]
    })
    //setQuestionIds(new Map(t))
  }
  const dataFromReportCase1 = (reports) => {
    //console.log(reports)
    let dataToExport = []

    reports.forEach(iReport => {
      let temp = iReport.answers.map(answer => {
        //console.log(item)
        return {
          user: user.modelId,
          item: answer.idQuestion._id, //questionIds.get(answer.idQuestion._id)
          skill: answer.idQuestion.skill_model_b,
          correct: answer.score,
          wins: 0, 
          fails: 0}
      })
      
      //console.log(temp)
      let wins = [0, 0]
      let fails = [0, 0]
      temp.forEach(answer => {
        //console.log(fails[item.skill-1])
        answer.wins  = wins[answer.skill-1]
        answer.fails = fails[answer.skill-1]
        wins[answer.skill-1]  =  wins[answer.skill-1] + answer.correct
        fails[answer.skill-1] = fails[answer.skill-1] + Math.abs(answer.correct - 1)
      })

      dataToExport = dataToExport.concat(temp)
    })
    
    return dataToExport
  }

  const generateReportCase1 = async() => { //async(event, done) 
    try {
      if (user !== null) {
        //const response = await getReportById({idReport: '62dfc3501fbce4ce6891d0f2'})
        //const res_exercise = await getExercisesById({idExercise: '62bb7c5e5b6c41563b427ac4'})
        //const res_cando = await getCanDosById({idCanDo: '62b9d7cc8c02c34b1472319e'})

        //const response = await getReportsByUser({idUser: user._id})
        const response = await getPopulatedReportById({idReport: '62fd38376f2a2de7a412b75f'})
        console.log(response)
        //const tReports = await getReports()
        //console.log(tReports)
        //createQuestionsModelIds(tReports)
        setDataCsv(dataFromReportCase1(response))
        console.log('relatorios carregados')
        //setReport(response[0])
        //setExercises(res_exercise)
        //setCanDo(res_cando)
        //done(true)
      }
    } catch (err) {
      console.log(err)
      //done(false)
    }
  }


  /*
      {container}
      <div className="btn-grid">
        <button className="btn btn-primary" onClick={() => generateReportCase1()}>Carregar Relatórios: Case 1</button>
        <CSVLink
          data={dataCsv}
          enclosingCharacter={``}
          //asyncOnClick={true}
          //onClick={generateReport}
          filename={"my-file.csv"}
          className="btn btn-primary"
        >
          Baixar Relatórios
        </CSVLink>
      </div>
  */
  return (
    <div className="container">
      <h1>Bem-vindo!</h1>
      <UserContainer />
    </div>
  )
}

export default HomeContainer