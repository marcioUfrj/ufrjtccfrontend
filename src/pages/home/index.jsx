import React, { useState } from 'react'
import UserContainer from './profile'
import { ReportContainer } from '../../components/'
import { getReportById, getReportsByUser, getExercisesById, getCanDosById } from '../../services/'

import { useUserContext } from '../../components/'

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


  const dataFromReportCase1 = (reports) => {
    console.log(reports)
    let dataToExport = []

    reports.forEach(iReport => {
      let temp = iReport.answers.map(item => {
        //console.log(item)
        return {
          idUser: iReport.idUser, 
          idQuestion: item.idQuestion, 
          skill: iReport.idCanDo === "62b9d72d8c02c34b14723195" ? 1 : 2,
          correct: item.score, 
          wins: 0, 
          fails: 0}
      })
      
      //console.log(temp)
      let wins = [0, 0]
      let fails = [0, 0]
      temp.forEach(item => {
        //console.log(fails[item.skill-1])
        item.wins = wins[item.skill-1]
        item.fails = fails[item.skill-1]
        wins[item.skill-1] = wins[item.skill-1] + item.correct
        fails[item.skill-1] = fails[item.skill-1] + Math.abs(item.correct - 1)
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

        const response = await getReportsByUser({idUser: user._id})
        //console.log(response)
        //console.log(res_exercise[0])
        //console.log(res_cando)
        setDataCsv(dataFromReportCase1(response))
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


  return (
    <div className="container">
      <h1>Bem-vindo!</h1>
      <UserContainer />
      {container}
      <div className="btn-grid">
        <button className="btn btn-primary" onClick={() => generateReportCase1()}>Carregar Relatórios: Case 1</button>
        <CSVLink
          data={dataCsv}
          //asyncOnClick={true}
          //onClick={generateReport}
          filename={"my-file.csv"}
          className="btn btn-primary"
        >
          Baixar Relatórios
        </CSVLink>
      </div>
    </div>
  )
}

export default HomeContainer