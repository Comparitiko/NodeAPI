import { ENVIRONMENT } from '../consts/environment.js'

export const userService = {
  isAuthenticated () {
    const token = localStorage.getItem('token')
    return !!token
  },

  getUser () {
    return {
      token: localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user'))
    }
  },

  setUser (token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },

  async login (email, password) {
    const body = JSON.stringify({
      email: email.value,
      password: password.value
    })

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })

      if (res.ok) {
        const data = await res.json()
        this.setUser(data.token, data.user)
        return { ok: true, ...data }
      }

      if (res.status === 400) {
        const data = await res.json()
        return { ok: false, ...data }
      }
      
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async register (email, username, password, confirmPassword) {
    const body = JSON.stringify({
      email,
      username,
      password,
      confirmPassword
    })

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json()
          return { ok: false, ...data }
        }
      }

      const data = await res.json()
      this.setUser(data.token, data.user)

      return { ok: true, ...data }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async refreshToken () {
    const { token } = this.getUser()
    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          token: localStorage.getItem('token')
        })
      })

      // Check if the response is ok
      if (res.ok) {
        // Parse the response as JSON and set the token and user in local storage
        const data = await res.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.user)
      } else {
        // If the response is not ok, clear the local storage
        localStorage.clear()
      }
    } catch (err) {
      localStorage.clear()
    }
  },

  logout () {
    localStorage.clear()
  }
}