import React, { useState } from 'react'
import UserContainer from './profile'
import { ReportContainer, useUserContext } from '../../components/'
import { getPopulatedReportById } from '../../services/'


import { Temporal } from '@js-temporal/polyfill'
//import { CSVLink } from 'react-csv'


const HomeContainer = () => {
  // Controller
  const { user } = useUserContext()

  // States
  //const [dataCsv, setDataCsv] = useState([])

  let container
  //report !== '' ? container = <ReportContainer report={report} canDo={canDo} exercises={exercises} /> : container = <div></div>
  
  
  
  /*
  
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
  const generateReportCase1 = async() => { //async(event, done) 
    try {
      if (user !== null) {
        const response = await getPopulatedReportById({idReport: '62fd38376f2a2de7a412b75f'})
        console.log(response)
        console.log('relatorios carregados')
      }
    } catch (err) {
      console.log(err)
    }
  }
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