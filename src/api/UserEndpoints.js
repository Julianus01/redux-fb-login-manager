import axios from 'axios'

export default class UserEndpoints {
  static loginWithEmailAndPassword = credentials =>
    axios.post(`/user/login`, { credentials })
}