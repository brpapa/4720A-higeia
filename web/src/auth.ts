import { addAuthHeader } from './services/api'

import { TUser } from './types'

// uma única instancia de Auth é manipulada por toda a aplicacao
class Auth {
  private isLogged: boolean

  public user?: TUser
  public username?: string
  public password?: string

  constructor() {
    this.isLogged = false

    const user = localStorage.getItem('user')
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    if (username && password && user) {
      this.isLogged = true
      this.user = user === 'patient' ? 'patient' : 'doctor'
      this.username = username
      this.password = password
      addAuthHeader(username, password)
    }
  }

  public isAuthenticated() {
    return this.isLogged
  }

  public login(remember: boolean, user: TUser, username: string, password: string) {
    this.isLogged = true

    if (remember) {
      localStorage.setItem('user', user)
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
    }

    this.user = user
    this.username = username
    this.password = password
  }

  public logout() {
    this.isLogged = false
    localStorage.clear()

    this.user = this.username = this.password = undefined
  }
}

export default new Auth()
