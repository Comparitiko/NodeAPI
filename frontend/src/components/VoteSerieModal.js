// Error: <p class="text-red-500 text-xs italic">Please choose a password.</p>

import { EVENTS } from '../consts/events.js'
import { serieService } from '../services/serieService.js'
import { Router } from '../router/Router.js'

export const VoteSerieModal = (modalId) => {
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 bg-slate-700 bg-opacity-50 h-full w-full hidden z-10'
  modal.id = modalId
  modal.innerHTML = `
          <div class="relative top-40 bottom-40 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-gray-300 max-h-[90vh] flex flex-col">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Votar serie: <span id="modal-serie-title"></span></h3>
                <div class="mt-2 px-7 py-3 max-h-[70vh] overflow-auto scroll-m-5 scroll-smooth">
                  <form id="vote-serie-form" class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="rating">
                        Puntuación
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rating" type="number" max="5" min="1" required>
                    </div>
                    <input type="hidden" id="input-serie-id">
                    <div class="mt-4 flex flex-col items-center justify-center">
                      <button id="vote-serie" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Puntuar
                      </button>
                  </form>
                </div>
            </div>
            <div class="items-center px-4 py-3">
                    <button id="closeVoteSerieModal" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Cerrar
                    </button>
            </div>
          </div>
      </div>
      `

  // Setup the events listeners for the modal
  const form = modal.querySelector('#vote-serie-form')
  form.addEventListener(EVENTS.SUBMIT, async (event) => {
    event.preventDefault()

    const serieId = form.querySelector('#input-serie-id').value
    const rating = parseInt(form.querySelector('#rating').value)

    const res = await serieService.rate(rating, serieId)

    if (res.ok) {
      // If the series is rated correctly, reload the page
      Router.navigateTo('/series')
    } else {
      console.error(res.message)
    }
  })

  return modal
}