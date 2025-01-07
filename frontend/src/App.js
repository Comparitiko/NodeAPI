import { userService } from './services/userService.js'
import { Router } from './router/Router.js'

export const App = async () => {
  // Check if user is authenticated and refresh token if it is
  if (userService.isAuthenticated()) await userService.refreshToken()

  Router.init()
}