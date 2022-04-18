import axios from 'axios'
import { backendURL } from '../constants/constants'

const baseURL = `${backendURL}/users`

export async function getUserByLoginId(userId) {
  const response = await axios.get(`${baseURL}/ByLoginId/${userId}`)
  return response.data
}

export async function createUser(user) {
  const response = await axios.post(`${baseURL}/`, user)
  return response.data
}

export async function updateUser(user) {
  const response = await axios.put(`${baseURL}/${user._id}`, user)
  return response.data //ja eh o user object
}