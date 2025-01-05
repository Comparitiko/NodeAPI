import { $ } from '../utils/selector.js'
import { ENVIRONMENT } from '../consts/environment.js'

export class SeriesPage {

  static #rootElement

  static render () {

    SeriesPage.#rootElement = $('div')

    SeriesPage.#rootElement.innerHTML = `
        <main class="flex flex-col items-center justify-center h-screen">
            <div id="series-list" class="flex flex-col items-center justify-center w-full">
                
            </div>
        </main>
        `
    SeriesPage.#setupEventListeners()
  }

  static #setupEventListeners () {
    const form = SeriesPage.#rootElement.querySelector('form')

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

      console.log(res)
    })
  }
}