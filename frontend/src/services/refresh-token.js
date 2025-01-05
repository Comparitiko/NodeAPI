import { ENVIRONMENT } from '../consts/environment.js'

export const refreshToken = async () => {
  try {
    const res = await fetch(`${ENVIRONMENT.API_HOST}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
}