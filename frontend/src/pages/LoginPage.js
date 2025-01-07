import { $ } from '../utils/selector.js'
import { EVENTS } from '../consts/events.js'
import { loginSchema } from '../schemas/user.schemas.js'
import { userService } from '../services/userService.js'
import { Router } from '../router/Router.js'

export class LoginPage {

  static #rootElement

  static render () {

    LoginPage.#rootElement = $('div')

    LoginPage.#rootElement.innerHTML = `
      <main class="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
        <div class="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <!-- Formulario de Login -->
        <form class="mb-8">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-100">Iniciar Sesión</h2>
            <div class="mb-4">
                <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Correo electrónico</label>
                <input type="email" id="email" name="email" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100">
            </div>
            <div class="mb-6">
                <label for="password" class="block text-gray-300 text-sm font-bold mb-2">Contraseña</label>
                <input type="password" id="password" name="password" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Iniciar Sesión
            </button>
            <p class="mt-4 text-center text-sm text-gray-400">
                ¿No tienes una cuenta? 
                <a data-router href="/register" class="text-blue-500 hover:text-blue-400">Regístrate aquí</a>
            </p>
        </form>
        </div>
      </main>
    `
    LoginPage.#setupEventListeners()
  }

  static #setupEventListeners () {
    const form = LoginPage.#rootElement.querySelector('form')

    form.addEventListener(EVENTS.SUBMIT, async (event) => {
      event.preventDefault()

      const email = form.querySelector('#email')
      const password = form.querySelector('#password')

      const body = {
        email: email.value,
        password: password.value
      }

      // Check if the form is valid
      const { success, data, error } = loginSchema.safeParse(body)

      // If the form is valid, try to log in the user
      if (success) {
        const res = await userService.login(body)
        if (res.ok) {
          console.log(res)

          Router.navigateTo('/')
          Router.init()
        }
      }

      // If the form is not valid, set the errors

      LoginPage.#setErrors(error.errors)
    })
  }

  static #setErrors (errors) {
    console.log(errors)
    errors.forEach((error) => {
      const paragraph = document.createElement('p')
      paragraph.classList.add('text-red-500')
      paragraph.innerText = error.message
      LoginPage.#rootElement.querySelector('form').appendChild(paragraph)
    })
  }
}