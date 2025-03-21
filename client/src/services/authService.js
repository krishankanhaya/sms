import APIClient from "../helpers/api_helpers"
import * as url from "../helpers/url_helpers"
const api = new APIClient()


export const login = async (data) => {
  const response = await api.post(url.LOGIN, data)
  if (response.status === 200) {
    localStorage.setItem('accessToken', response.data.accessToken)
    return response
  } else if (response.status === 401) {
    return response
  }
  return response
}

export const register = async (data) => {
  const response = await api.post(url.REGISTER, data)
  return response.data
}

export const logout = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('role')
  const response = await api.post(url.LOGOUT)
  if (response.status === 200) {
    window.location.href = '/login'
  }
}

