import axios from 'axios'

export default class UserEndpoints {
  static createOrUpdateUser = user =>
    axios.post(`/user/createOrUpdateUser`, { user })
}