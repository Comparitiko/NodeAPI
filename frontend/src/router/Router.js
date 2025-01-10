import { ROUTES } from './routes.js'
import { match } from 'path-to-regexp'
import { userService } from '../services/userService.js'
import { $$ } from '../utils/selector.js'
import { EVENTS } from '../consts/events.js'

export class Router {
  static init () {
    const { pathname } = location
    const { route, params } = Router.#matchRoute(pathname)

    // Check if the user is not authenticated and the route requires authentication
    if (route.requiresAuth && !userService.isAuthenticated()) {
      // If the user is not authenticated, redirect to the login page
      Router.navigateTo('/login')
      return
    } else if (!route.requiresAuth && userService.isAuthenticated()) {
      // If the user is authenticated and the route does not require authentication (login page), redirect to the series page
      Router.navigateTo('/series')
      return
    }

    // Set the page title
    document.title = route.title

    // Render the page
    route.render(params)

    // Intercept links
    Router.#interceptLinks()
  }

  // Intercept the al the anchors with the data-router attribute to navigate to the corresponding page when clicked
  static #interceptLinks () {
    const links = $$('a[data-router]')

    // If there are no links with the data-router attribute, not try to intercept them
    if (!links || links.length === 0) return

    links.forEach((link) => {
      link.addEventListener(EVENTS.CLICK, (event) => {
        event.preventDefault()
        const href = link.getAttribute('href') || '/'
        Router.navigateTo(href)
      })
    })
  }

  // Navigate to the specified path
  static navigateTo (path) {
    history.pushState(null, '', path)
    Router.init()
  }

  // Match the route based on the path and return the route and the parameters
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