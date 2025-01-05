import { Router } from './components/Router.js'
import { refreshToken } from './services/refresh-token.js'

export const App = async () => {

  // Check if user is authenticated and refresh token if it is
  if (Router.isAuthenticated()) await refreshToken()

  Router.init()
}