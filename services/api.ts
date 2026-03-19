// simple-bank-2/services/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8084/v1'
})