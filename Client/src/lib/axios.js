import axios from 'axios'

export const AxiosLib = axios.create({
  baseURL: import.meta.env.BACKEND_URL ?? 'http://localhost:3000',
  withCredentials: true,
})
