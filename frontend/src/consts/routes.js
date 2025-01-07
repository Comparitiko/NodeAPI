import { LoginPage } from '../pages/LoginPage.js'
import { userService } from '../services/userService.js'

export const ROUTES = {
  '/': {
    title: userService.isAuthenticated() ? 'Inicio | Series API' : 'Inicio de sesión | Series API',
    render: () => userService.isAuthenticated() ? LoginPage.render() : LoginPage.render(),
    requiresAuth: userService.isAuthenticated()
  },
  '/login': {
    title: 'Inicio de sesión | Series API',
    render: () => LoginPage.render(),
    requiresAuth: false
  },
  '/register': {
    title: 'Registro | Series API',
    render: () => LoginPage.render(),
    requiresAuth: false
  },
  '/series': {
    title: 'Series | Series API',
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  '/series/toprated': {
    title: 'Series más valoradas | Series API',
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  '/series/genre/:genre': {
    title: 'Series de :genre | Series API',
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  '/series/:id': {
    title: 'Series | Series API',
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  '404': {
    title: 'Página no encontrada | Series API',
    render: () => LoginPage.render(),
    requiresAuth: userService.isAuthenticated()
  }
}