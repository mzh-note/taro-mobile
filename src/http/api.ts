import http, { request } from './index'

export const login = (data) => {
  return http.post('/wx/login', data)
}
export const loginPhone = (data) => {
  return http.post('/login/cellphone', data)
}

export const getChannels = () => {
  return request.get('/channels')
}

export const getArticles = (params) => {
  return request.get('/articles', {params})
}

export const getDetail = (id) => {
  return request.get(`/articles/${id}`)
}
