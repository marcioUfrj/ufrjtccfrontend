import axios from 'axios'
import { backendURL } from '../constants/constants'

const baseURL = `${backendURL}/reports`

export async function getReports(){
  const response = await axios.get(baseURL)
  return response.data
}

export async function getReportById({ idReport }){
  const response = await axios.get(`${baseURL}/${idReport}`)
  return response.data
}

export async function getReportsByUser({ idUser }){
  const response = await axios.get(`${baseURL}/ByUser/${idUser}`)
  return response.data
}

export async function createReport(report) {
  const response = await axios.post(baseURL, report)
  return response.data
}