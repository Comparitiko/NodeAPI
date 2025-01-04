import {Route, ROUTES} from "../consts/routes.ts";
import {match} from "path-to-regexp";

interface RouterParams {
  route: Route
  params: Record<string, string>
}

export class Router {
  static init() {
    const {pathname} = location;
    const {route, params} = Router.matchRoute(pathname);

    // Verificar si la ruta requiere autenticación
    if (route.requiresAuth && !Router.isAuthenticated()) {
      // Si no está autenticado, redirigir al login
      window.location.href = "/login";
      return;
    } else if (!route.requiresAuth && Router.isAuthenticated()) {
      // Si está autenticado, redirigir a la ruta sin autenticación
      window.location.href = "/series"
      return;
    }

    document.title = route.title
    route.render(params)

    Router.interceptLinks()
  }

  private static interceptLinks() {
    document.querySelectorAll('a[data-router]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const href = link.getAttribute('href') || '/';
        Router.navigateTo(href);
      });
    });
  }

  private static navigateTo(path: string) {
    history.pushState(null, '', path);
    Router.init()
  }

  private static matchRoute(path: string): RouterParams {
    for (const pattern in ROUTES) {
      const route = ROUTES[pattern];

      const matcher = match(pattern, {decode: decodeURIComponent});

      const matchResult = matcher(path);

      if (matchResult) {
        // Si se encuentra una coincidencia, retornar la ruta y los parámetros extraídos
        return {
          route,
          params: matchResult.params as Record<string, string>,
        };
      }
    }

    return {route: ROUTES["404"], params: {}};
  }

  private static isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!token && !!user;
  };
}