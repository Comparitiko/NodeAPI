import { $ } from '../utils/selector.js'
import { serieService } from '../services/serieService.js'
import SerieCard from '../components/SerieCard.js'
import Header from '../components/Header.js'

export class MySeriesPage {

  static #rootElement

  static async render () {

    MySeriesPage.#rootElement = $('div')

    const header = Header()

    MySeriesPage.#rootElement.innerHTML = `
        
        <main class="main-container">
            <div id="series-list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-5">
                
            </div>
        </main>
        <!-- Modal -->
        `

    MySeriesPage.#rootElement.prepend(header)

    await MySeriesPage.#printSeries()
    MySeriesPage.#setupEventListeners()
  }

  // Print all the series
  static async #printSeries () {
    const seriesList = MySeriesPage.#rootElement.querySelector('#series-list')

    const data = await serieService.getAllByUser()

    if (data.ok) {
      data.message.series.forEach((serie) => {
        seriesList.appendChild(SerieCard(serie, true))
      })
    }
  }

  // Setup the events listeners for the page
  static #setupEventListeners () {
    const deleteBtns = MySeriesPage.#rootElement.querySelectorAll('[data-deleteBtn]')

    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const card = e.target.closest('.card')
        const serie = {
          id: card.getAttribute('data-serie-id'),
          title: card.querySelector('#serie-title').innerText
        }

        const res = await serieService.deleteOneSerie(serie.id)

        if (res.ok) {
          card.remove()
        }
      })
    })
  }
}