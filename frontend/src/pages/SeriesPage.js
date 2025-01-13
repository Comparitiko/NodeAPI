import { $ } from '../utils/selector.js'
import { serieService } from '../services/serieService.js'
import SerieCard from '../components/SerieCard.js'
import Header from '../components/Header.js'
import { EVENTS } from '../consts/events.js'
import { AddSerieModal } from '../components/AddSerieModal.js'
import { VoteSerieModal } from '../components/VoteSerieModal.js'

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
        `

    SeriesPage.#rootElement.prepend(header)

    const newSerieModal = AddSerieModal('new-serie-modal')

    SeriesPage.#rootElement.append(newSerieModal)

    const voteSerieModal = VoteSerieModal('vote-serie-modal')

    SeriesPage.#rootElement.append(voteSerieModal)

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
    const modal = SeriesPage.#rootElement.querySelector('#new-serie-modal')
    const closeModalBtn = SeriesPage.#rootElement.querySelector('#closeModal')
    const voteSerieModal = SeriesPage.#rootElement.querySelector('#vote-serie-modal')
    const voteBtn = SeriesPage.#rootElement.querySelectorAll('[data-voteBtn]')

    newSerieBtn.addEventListener(EVENTS.CLICK, () => {
      modal.classList.remove('hidden');
    })

    closeModalBtn.addEventListener(EVENTS.CLICK, () => {
      modal.classList.add('hidden')
    })

    voteBtn.forEach((btn) => {
      btn.addEventListener(EVENTS.CLICK, async (e) => {
        const card = e.target.closest('.card')
        const serie = {
          id: card.getAttribute('data-serie-id'),
          title: card.querySelector('#serie-title').innerText
        }

        voteSerieModal.classList.remove('hidden')
        voteSerieModal.querySelector('#modal-serie-title').innerText = serie.title
        voteSerieModal.querySelector('#input-serie-id').value = serie.id
      })
    })
  }
}