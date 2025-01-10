import { $ } from '../utils/selector.js'
import { serieService } from '../services/serieService.js'
import SerieCard from '../components/SerieCard.js'
import Header from '../components/Header.js'
import { EVENTS } from '../consts/events.js'

export class SeriesPage {

  static #rootElement

  static async render () {

    SeriesPage.#rootElement = $('div')

    const header = Header()

    SeriesPage.#rootElement.innerHTML = `
        
        <main class="main-container">
            <button id="new-serie" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200">
            Nueva Serie
            </button>
            <div id="series-list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-5">
                
            </div>
        </main>
        
        <!-- Modal -->
        <div id="modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden">
          <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Título de la Modal</h3>
                <div class="mt-2 px-7 py-3">
                    <p class="text-sm text-gray-500">
                        Este es el contenido de la modal. Puedes poner cualquier cosa aquí, como texto, imágenes o formularios.
                    </p>
                </div>
                <div class="items-center px-4 py-3">
                    <button id="closeModal" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Cerrar
                    </button>
                </div>
            </div>
          </div>
      </div>
        
        `

    SeriesPage.#rootElement.prepend(header)

    await SeriesPage.#printSeries()
    SeriesPage.#setupEventListeners()
  }

  // Print all the series
  static async #printSeries () {
    const seriesList = SeriesPage.#rootElement.querySelector('#series-list')

    const data = await serieService.getAll()

    data.series.forEach((serie) => {
      seriesList.appendChild(SerieCard(serie))
    })
  }

  // Setup the events listeners for the page
  static #setupEventListeners () {
    const newSerieBtn = SeriesPage.#rootElement.querySelector('#new-serie')
    const modal = SeriesPage.#rootElement.querySelector('#modal')
    const closeModalBtn = SeriesPage.#rootElement.querySelector('#closeModal')

    newSerieBtn.addEventListener(EVENTS.CLICK, () => {
      modal.classList.remove('hidden');
    })

    closeModalBtn.addEventListener(EVENTS.CLICK, () => {
      modal.classList.add('hidden')
    })

    window.addEventListener(EVENTS.CLICK, (event) => {
      if (event.target !== modal) modal.classList.add('hidden')
    })
  }
}