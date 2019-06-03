import axios from 'axios'

class ServiceRequest {
  get (url) {
    return axios.get(url)
  }

  post (url, dados) {
    return axios.post(url, dados)
  }

  patch (url, dados) {
    return axios.patch(url, dados)
  }

  delete (url, dados) {
    return axios.delete(url, dados)
  }
}

export default ServiceRequest
