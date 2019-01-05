import axios from 'axios'

export default class UserEndpoints {
  static updateUserData = user =>
    axios.patch(`/user`, { user })
}