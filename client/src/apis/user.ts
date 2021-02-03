import { logger } from '../utils/logger'
import api from './api'

const login = async (data) => {
  try {
    const action = '/login'
    const result = await api.postData(action, data)

    return result.data
  } catch (error) {
    throw error
  }
}

export default {
  login
}
