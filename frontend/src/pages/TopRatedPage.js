import { $ } from '../utils/selector.js'
import SerieCard from '../components/SerieCard.js'
import { serieService } from '../services/serieService.js'
import Header from '../components/Header.js'
import { VoteSerieModal } from '../components/VoteSerieModal.js'
import { EVENTS } from '../consts/events.js'

export class TopRatedPage {

  static #rootElement

  static async render () {

    TopRatedPage.#rootElement = $('div')

    TopRatedPage.#rootElement.innerHTML = `
        
        <main class="main-container">
            <div id="series-list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-5">
                
            </div>
        </main>
    `

    const header = Header()

    TopRatedPage.#rootElement.prepend(header)

    const voteSerieModal = VoteSerieModal('vote-serie-modal')

    TopRatedPage.#rootElement.append(voteSerieModal)

    await TopRatedPage.#printSeries()
    TopRatedPage.#setupEventListeners()
  }

  static async #printSeries () {
    const seriesList = TopRatedPage.#rootElement.querySelector('#series-list')

    const data = await serieService.getTopRated()

    if (data.ok) {
      data.message.series.forEach((serie) => {
        seriesList.appendChild(SerieCard(serie))
      })
    }
  }

  static #setupEventListeners () {
    const voteSerieModal = TopRatedPage.#rootElement.querySelector('#vote-serie-modal')
    const voteBtns = TopRatedPage.#rootElement.querySelectorAll('button[data-voteBtn]')
    const closeVoteSerieModal = TopRatedPage.#rootElement.querySelector('#closeVoteSerieModal')

    closeVoteSerieModal.addEventListener(EVENTS.CLICK, () => {
      voteSerieModal.classList.add('hidden')
    })

    voteBtns.forEach((btn) => {
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