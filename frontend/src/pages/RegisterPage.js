import { $ } from '../utils/selector.js'
import { userService } from '../services/userService.js'
import { EVENTS } from '../consts/events.js'
import {Router} from "../router/Router.js";

export class RegisterPage {

  static #rootElement

  static render () {

    RegisterPage.#rootElement = $('div')

    RegisterPage.#rootElement.innerHTML = `
      <main class="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
        <div class="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <!-- Formulario de Registro -->
          <form>
              <h2 class="text-2xl font-bold mb-6 text-center text-gray-100">Registrarse</h2>
              <div class="mb-4">
                  <label for="username" class="block text-gray-300 text-sm font-bold mb-2">Nombre de usuario</label>
                  <input type="text" id="username" name="username" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100">
              </div>
              <div class="mb-4">
                  <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Correo electrónico</label>
                  <input type="email" id="email" name="email" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100">
              </div>
              <div class="mb-4">
                  <label for="password" class="block text-gray-300 text-sm font-bold mb-2">Contraseña</label>
                  <input type="password" id="password" name="password" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100">
              </div>
              <div class="mb-6">
                  <label for="confirmPassword" class="block text-gray-300 text-sm font-bold mb-2">Confirmar contraseña</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100">
              </div>
              <button type="submit" class="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  Registrarse
              </button>
              <p class="mt-4 text-center text-sm text-gray-400">
                  ¿Ya tienes una cuenta? 
                  <a data-router href="/login" class="text-blue-500 hover:text-blue-400">Inicia sesión aquí</a>
              </p>
          </form>
        </div>
      </main>
    `
    RegisterPage.#setupEventListeners()
  }

  static #setupEventListeners () {
    const form = RegisterPage.#rootElement.querySelector('form')

    form.addEventListener(EVENTS.SUBMIT, async (event) => {
      event.preventDefault()

      const username = form.querySelector('#username').value
      const email = form.querySelector('#email').value
      const password = form.querySelector('#password').value
      const confirmPassword = form.querySelector('#confirmPassword').value

      const res = await userService.register(email, username, password, confirmPassword)

      if (res.ok) {
        userService.setUser(res.message.token, res.message.user)
        Router.navigateTo('/')
      }
    })
  }
}