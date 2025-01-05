import { LoginPage } from '../pages/LoginPage.js'
import { Router } from '../components/Router.js'

export const ROUTES = {
  '/': {
    title: Router.isAuthenticated() ? 'Inicio | Series API' : 'Inicio de sesión | Series API',
    render: () => Router.isAuthenticated() ? LoginPage.render() : LoginPage.render(),
    requiresAuth: Router.isAuthenticated()
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
    requiresAuth: Router.isAuthenticated()
  }
}