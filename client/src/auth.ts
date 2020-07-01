import api from './services/api'

type UserType = 'patient' | 'doctor'

// uma única instancia de Auth é manipulada por toda a aplicacao
class Auth {
  userType?: UserType
  isAuthenticated: boolean

  constructor() {
    this.isAuthenticated = false
  }

  authenticate() {

  }

  signOut() {

  }

  login(username: string, password: string) {
    if (username == 'b' && password == '1') return true
    return false
  }
}

export default new Auth()
