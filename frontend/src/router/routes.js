import { LoginPage } from '../pages/LoginPage.js'
import { Error404Page } from '../pages/Error404Page.js'

import { userService } from '../services/userService.js'
import { RegisterPage } from '../pages/RegisterPage.js'
import { SeriesPage } from '../pages/SeriesPage.js'
import { SeriePage } from '../pages/SeriePage.js'
import { TopRatedPage } from '../pages/TopRatedPage.js'
import { SeriesByGenrePage } from '../pages/SeriesByGenrePage.js'

export const ROUTES = {
  '/': {
    title: userService.isAuthenticated() ? 'Inicio | Series API' : 'Inicio de sesión | Series API',
    render: () => userService.isAuthenticated()
      ? SeriesPage.render()
      : LoginPage.render(),
    requiresAuth: userService.isAuthenticated()
  },
  '/login': {
    title: 'Inicio de sesión | Series API',
    render: () => LoginPage.render(),
    requiresAuth: false
  },
  '/register': {
    title: 'Registro | Series API',
    render: () => RegisterPage.render(),
    requiresAuth: false
  },
  '/series': {
    title: 'Series | Series API',
    render: () => SeriesPage.render(),
    requiresAuth: true
  },
  '/series/toprated': {
    title: 'Top 10 Series más valoradas | Series API',
    render: () => TopRatedPage.render(),
    requiresAuth: true
  },
  '/series/genres/:genre': {
    title: 'Series | Series API',
    render: (params) => SeriesByGenrePage.render(params),
    requiresAuth: true
  },
  '/series/:id': {
    title: 'Series | Series API',
    render: (params) => SeriePage.render(params),
    requiresAuth: true
  },
  '404': {
    title: 'Página no encontrada | Series API',
    render: () => Error404Page.render(),
    requiresAuth: userService.isAuthenticated()
  }
}