import { Router } from './components/Router'
import { userService } from './services/userService.js'

export const App = async () => {
  // Check if user is authenticated and refresh token if it is
  if (userService.isAuthenticated()) await userService.refreshToken()

  Router.init()
}