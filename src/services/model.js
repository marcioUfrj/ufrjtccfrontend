import axios from 'axios'
import { backendURL } from '../constants/constants'

const baseURL = `${backendURL}/models`

export async function getModels() {
  const response = await axios.get(baseURL)
 return response.data
}

export async function getModelsById({idCanDo}) {
  const response = await axios.get(`${baseURL}/${idCanDo}`)
 return response.data
}

export async function getActiveModels() {
  const response = await axios.get(`${baseURL}/active`)
 return response.data
}