import axiosInstance from "./axiosInstance";

class APIClient {
  get = (url, params) => {
    return axiosInstance.get(url, params);
  };

  post = (url, data) => {
    return axiosInstance.post(url, data);
  };

  update = (url, data) => {
    return axiosInstance.put(url, data);
  };

  delete = (url, config) => {
    return axiosInstance.delete(url, config);
  };
}

export default APIClient;
