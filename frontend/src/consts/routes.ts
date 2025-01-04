import {LoginPage} from "../pages/LoginPage.ts";

export interface Route {
  title: string
  render: (params?: Record<string, string>) => void
  requiresAuth: boolean
}

export const ROUTES: { [pattern: string]: Route } = {
  "/": {
    title: "Series | Series API",
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  "/login": {
    title: "Inicio de sesión | Series API",
    render: () => LoginPage.render(),
    requiresAuth: false
  },
  "/register": {
    title: "Registro | Series API",
    render: () => LoginPage.render(),
    requiresAuth: false
  },
  "/series": {
    title: "Series | Series API",
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  "/series/toprated": {
    title: "Series más valoradas | Series API",
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  "/series/genre/:genre": {
    title: "Series de :genre | Series API",
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  "/series/:id": {
    title: "Series | Series API",
    render: () => LoginPage.render(),
    requiresAuth: true
  },
  "404": {
    title: "Página no encontrada | Series API",
    render: () => LoginPage.render(),
    requiresAuth: false
  }
}