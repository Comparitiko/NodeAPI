import { $ } from '../utils/selector.js'
import { ENVIRONMENT } from '../consts/environment.js'
import { Router } from '../components/Router.js'

export class LoginPage {

  static #rootElement

  static render (errors = []) {

    LoginPage.#rootElement = $('div')

    LoginPage.#rootElement.innerHTML = `
        <main class="flex flex-col items-center justify-center h-screen">
            ${errors && `<div class="alert alert-error">${errors.map(error => `<p>${error.message}</p>`).join('')}</div>`}
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-3xl font-bold">Login</h1>
                <form class="flex flex-col items-center justify-center w-full">
                    <input type="text" placeholder="Email" class="w-full mt-2 p-2 border-2 border-gray-400 rounded-md">
                    <input type="password" placeholder="Password" class="w-full mt-2 p-2 border-2 border-gray-400 rounded-md">
                    <button class="w-full mt-2 p-2 border-2 border-gray-400 rounded-md">Login</button>
                </form>
            </div>
        </main>
        `
    LoginPage.#setupEventListeners()
  }

  static #setupEventListeners () {
    const form = LoginPage.#rootElement.querySelector('form')

    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      const email = form.querySelector('#email')
      const password = form.querySelector('#password')

      const body = JSON.stringify({
        email: email.value,
        password: password.value
      })

      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.user)
        Router.init()
      }

      console.log(res)
    })
  }
}