import { ROUTES } from '../consts/routes.js'
import { match } from 'path-to-regexp'
import { userService } from '../services/userService.js'

export class Router {
  static init () {
    const { pathname } = location
    const { route, params } = Router.#matchRoute(pathname)

    // Verificar si la ruta requiere autenticación
    if (route.requiresAuth && !userService.isAuthenticated()) {
      // Si no está autenticado, redirigir al login
      return window.location.href = '/login'
    } else if (!route.requiresAuth && userService.isAuthenticated()) {
      // Si está autenticado, redirigir a la ruta sin autenticación
      return window.location.href = '/series'
    }

    document.title = route.title
    route.render(params)

    Router.#interceptLinks()
  }

  static #interceptLinks () {
    document.querySelectorAll('a[data-router]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        const href = link.getAttribute('href') || '/'
        Router.#navigateTo(href)
      })
    })
  }

  static #navigateTo (path) {
    history.pushState(null, '', path)
    Router.init()
  }

  static #matchRoute (path) {
    for (const pattern in ROUTES) {
      const route = ROUTES[pattern]

      const matcher = match(pattern, { decode: decodeURIComponent })

      const matchResult = matcher(path)

      if (matchResult) {
        // Si se encuentra una coincidencia, retornar la ruta y los parámetros extraídos
        return {
          route,
          params: matchResult.params,
        }
      }
    }

    return { route: ROUTES['404'], params: {} }
  }
}