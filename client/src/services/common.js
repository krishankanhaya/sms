import APIClient from "../helpers/api_helpers";
import * as url from "../helpers/url_helpers";
const api = new APIClient();

export const getProfile = async () => {
  try {
    const res = await api.get(url.GET_PROFILE)
    if (res.status === 200) {
      return res
    }
  } catch (error) {
    return error
  }
}


export const updateProfile = async (updateData) => {
  try {
    const res = await api.post(url.UPDATE_PROFILE, updateData)
    if (res.status === 200) {
      return res
    }
  } catch (error) {
    return error
  }
}
