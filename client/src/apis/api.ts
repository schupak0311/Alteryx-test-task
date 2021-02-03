import axios from 'axios'
import { getAuthTokenLocalStorage } from '../utils/handleLocalStorage'

const isLocal = process.env.REACT_APP_LOCAL

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  params: {}
})

export default {
  getData(action: string, data?: any) {
    let url = `${
      isLocal
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL
    }`
    url += action
    return instance.get(url, data)
  },
  postData(action: string, data?: any) {
    let url = `${
      isLocal
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL
    }`
    url += action
    return instance.post(url, data)
  }
}
