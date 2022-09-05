import axios from 'axios'
import { backendURL } from '../constants/constants'

const baseURL = `${backendURL}/exercises`

export async function getExercises() {
  const response = await axios.get(baseURL)
 return response.data
}

export async function getExercisesById({ idExercise }) {
  const response = await axios.get(`${baseURL}/${idExercise}`)
 return response.data
}

export async function getExercisesByCanDo({ idCanDo }) {
  const response = await axios.get(`${baseURL}/ByCanDo/${idCanDo}`)
 return response.data
}

export async function getPolulatedExercisesByCanDo({ idCanDo }) {
  const response = await axios.get(`${baseURL}/getPopulated/ByCanDo/${idCanDo}`)
 return response.data
}

