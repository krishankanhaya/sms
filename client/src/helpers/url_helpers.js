const BASE_URL = 'http://localhost:5000/api/v1'

// auth urls
export const REGISTER = `{BASE_URL}/auth/register`
export const LOGIN = `${BASE_URL}/auth/login`
export const LOGOUT = `${BASE_URL}/auth/logout`

// user urls
export const GET_PROFILE = `${BASE_URL}/user/getProfile`
export const UPDATE_PROFILE = `${BASE_URL}/user/updateProfile`
export const DELETE_PROFILE = `${BASE_URL}/user/deleteProfile`
