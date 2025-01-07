import { $ } from '../utils/selector.js'
import { serieService } from '../services/serieService.js'
import SerieCard from '../components/SerieCard.js'
import Header from '../components/Header.js'

export class SeriesPage {

  static #rootElement

  static async render () {

    SeriesPage.#rootElement = $('div')

    const header = Header()

    SeriesPage.#rootElement.innerHTML = `
        
        <main class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
            <div id="series-list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-5">
                
            </div>
        </main>
        `

    SeriesPage.#rootElement.prepend(header)

    await SeriesPage.#printSeries()
    SeriesPage.#setupEventListeners()
  }

  static async #printSeries () {
    const seriesList = SeriesPage.#rootElement.querySelector('#series-list')

    const data = await serieService.getAll()

    let seriesCards = ''

    data.series.forEach((serie) => {
      seriesCards += SerieCard(serie)
    })

    seriesList.innerHTML = seriesCards
  }

  static #setupEventListeners () {

  }
}