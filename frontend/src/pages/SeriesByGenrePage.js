import { $ } from '../utils/selector.js'
import Header from '../components/Header.js'
import { VoteSerieModal } from '../components/VoteSerieModal.js'
import { serieService } from '../services/serieService.js'
import SerieCard from '../components/SerieCard.js'
import { EVENTS } from '../consts/events.js'

export class SeriesByGenrePage {

  static #rootElement

  static async render (params) {

    SeriesByGenrePage.#rootElement = $('div')

    SeriesByGenrePage.#rootElement.innerHTML = `
        
        <main class="main-container">
            <div id="series-list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-5">
                
            </div>
        </main>
        <!-- Modal -->
        `

    const header = Header()

    SeriesByGenrePage.#rootElement.prepend(header)

    const voteSerieModal = VoteSerieModal('vote-serie-modal')

    SeriesByGenrePage.#rootElement.append(voteSerieModal)

    await SeriesByGenrePage.#printSeries(params.genre)

    SeriesByGenrePage.#setupEventListeners()
  }

  // Setup the events listeners for the page
  static async #printSeries (genre) {
    const seriesList = SeriesByGenrePage.#rootElement.querySelector('#series-list')

    const seriesByGenre = await serieService.getAllSeriesByGenre(genre)

    if (seriesByGenre.ok) {
      seriesByGenre.message.series.forEach(serie => {
        seriesList.append(SerieCard(serie))
      })
    }
  }

  // Setup the events listeners for the page
  static #setupEventListeners () {
    const voteSerieModal = SeriesByGenrePage.#rootElement.querySelector('#vote-serie-modal')
    const voteBtns = SeriesByGenrePage.#rootElement.querySelectorAll('[data-voteBtn]')
    const closeVoteSerieModal = SeriesByGenrePage.#rootElement.querySelector('#closeVoteSerieModal')

    closeVoteSerieModal.addEventListener(EVENTS.CLICK, () => {
      voteSerieModal.classList.add('hidden')
    })

    // When clicking on a vote button, show the modal with the serie information
    voteBtns.forEach((btn) => {
      btn.addEventListener(EVENTS.CLICK, (e) => {
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