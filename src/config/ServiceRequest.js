import axios from 'axios'

class ServiceRequest {
  apiUrl = process.env.API_URL

  get (url) {
    return axios.get(this.apiUrl + url)
  }

  post (url, dados) {
    return axios.post(this.apiUrl + url, dados)
  }

  patch (url, dados) {
    return axios.patch(this.apiUrl + url, dados)
  }

  delete (url, dados) {
    return axios.delete(this.apiUrl + url, dados)
  }
}

export default ServiceRequest
