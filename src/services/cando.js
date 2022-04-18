import axios from 'axios'
import { backendURL } from '../constants/constants'

const baseURL = `${backendURL}/candos`

export async function getCanDos() {
  const response = await axios.get(baseURL)
 return response.data
}

export async function getCanDosByLevel({ level }) {
  const response = await axios.get(`${baseURL}/ByLevel/${level}`)
 return response.data
}