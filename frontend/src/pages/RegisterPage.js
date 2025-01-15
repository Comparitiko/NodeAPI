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
              <p id="error" class="error-text"></p>
              <div class="mb-4">
                  <label for="username" class="block text-gray-300 text-sm font-bold mb-2">Nombre de usuario</label>
                  <input type="text" id="username" name="username" minlength="2" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100">
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

      if (RegisterPage.#checkErrors(username, email, password, confirmPassword)) return

      const res = await userService.register(email, username, password, confirmPassword)

      if (res.ok) {
        userService.setUser(res.message.token, res.message.user)
        Router.navigateTo('/')
      } else {
        const pError = form.querySelector('#error')
        // If the message contains exists the user exist
        if (res.message.includes('exists')) {
          pError.innerText = 'El usuario ya existe'
        } else {
          pError.innerText = 'Ha surgido un problema en el servidor'
        }
      }
    })
  }

  static #checkErrors(username, email, password, confirmPassword) {
    const error = RegisterPage.#rootElement.querySelector('#error')

    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    // Check if password is valid
    if (!pattern.test(password)) {
      error.innerText = 'La contraseña debe contener al menos una letra mayúscula o una letra minúscula y un número y más de 8 caracteres'
      return true
    }

    // Check if passwords are the same
    if (password !== confirmPassword) {
      error.innerText = 'Las contraseñas no coinciden'
      return true
    }

    return false
  }
}