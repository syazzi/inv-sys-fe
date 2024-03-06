import axios from 'axios'

const baseURL = 'http://localhost:3000'

const axiosIns = axios.create({
  baseURL,
  timeout: 5000,
  headers: { 'Access-Control-Allow-Origin': '*' },
})

axiosIns.interceptors.request.use(config => {
  const authHeaders = JSON.parse(localStorage.getItem('authHeaders'))

  if (authHeaders) {
    config.headers['access-token'] = authHeaders['access-token']
    config.headers['client'] = authHeaders['client']
    config.headers['uid'] = authHeaders['uid']
    config.headers['expiry'] = authHeaders['expiry']
    config.headers['token-type'] = authHeaders['token-type']
  }
  return config
}, error => {
  return Promise.reject(error)
})

axiosIns.interceptors.response.use(response => {
  if (response.headers['access-token']) {
    const authHeaders = {
      'access-token': response.headers['access-token'],
      'client': response.headers['client'],
      'uid': response.headers['uid'],
      'expiry': response.headers['expiry'],
      'token-type': response.headers['token-type']
    }
    localStorage.setItem('authHeaders', JSON.stringify(authHeaders))
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default {
  get(endpoint, params = {}) {
    return axiosIns.get(`${baseURL}/${endpoint}`, { params })
  },
  create(endpoint, params = {}) {
    return axiosIns.post(`${baseURL}/${endpoint}`, params)
  },
  update(endpoint, params = {}) {
    return axiosIns.put(`${baseURL}/${endpoint}`, params)
  },
  patch(endpoint, params = {}) {
    return axiosIns.patch(`${baseURL}/${endpoint}`, params)
  },
  delete(endpoint, params = {}) {
    return axiosIns.delete(`${baseURL}/${endpoint}`, { params })
  }
}