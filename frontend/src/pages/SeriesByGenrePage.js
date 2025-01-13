import { $ } from '../utils/selector.js'
import Header from '../components/Header.js'

export class SeriesByGenrePage {

  static #rootElement

  static render (params) {

    SeriesByGenrePage.#rootElement = $('div')

    SeriesByGenrePage.#rootElement.innerHTML = `
        
        <main class="main-container">
            <button id="new-serie" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200">
            Nueva Serie
            </button>
            <div id="series-list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-5">
                
            </div>
        </main>
        <!-- Modal -->
        `

    const header = Header()

    SeriesByGenrePage.#rootElement.prepend(header)

    SeriesByGenrePage.#printSeries()
  }

  // Setup the events listeners for the page
  static #printSeries () {

  }

  // Setup the events listeners for the page
  static #setupEventListeners () {

  }
}