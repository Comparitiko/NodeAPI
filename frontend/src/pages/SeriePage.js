import { $ } from '../utils/selector.js'
import Header from '../components/Header.js'
import {serieService} from "../services/serieService.js";
import serieCard from "../components/SerieCard.js";
import {ROUTES} from "../router/routes.js";
import {firstLetterToUpper} from "../utils/utils.js";

export class SeriePage {

  static #rootElement

  static async render (params) {

    SeriePage.#rootElement = $('div')

    const res = await serieService.getSerieById(params.id)

    if (!res.ok) {
      return ROUTES['404'].render()
    }

    const {serie} = res.message

    const header = Header()

    const genresHtml = serie.genres.map(genre => {
      return `
        <a href="/series/genres/${genre}" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${firstLetterToUpper(genre)}</a>
      `
    }).join('')

    SeriePage.#rootElement.innerHTML = `
        
        <main class="main-container">
            <div class="uppercase tracking-wide text-sm text-white font-semibold">${serie.isMiniSerie ? 'Miniserie' : 'Serie'}</div>
            <div class="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h1 class="mt-1 text-4xl font-bold text-gray-200 leading-tight">${serie.title}</h1>
                <p class="mt-2 text-gray-100">${serie.year}</p>
                <div class="mt-4 flex items-center">
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <p class="ml-2 text-gray-100">${(serie.totalRatingCount / serie.totalVotes)} / 5</p>
                </div>
                <div class="mt-6">
                   ${genresHtml}
                </div>
                <div>
                <h2 class="text-xl font-bold text-gray-900">Detalles</h2>
                <ul class="mt-2 text-gray-300">
                    <li><strong>Temporadas:</strong> ${serie.numOfSeasons}</li>
                </ul>
            </div>
              </div>
              <img src="${serie.image}" alt="Serie ${serie.title}" class="h-96 object-contain">
            </div>
            <p class="mt-4 text-gray-100">${serie.description}</p>
        </main>
        `

    SeriePage.#rootElement.prepend(header)
  }

  // Setup the events listeners for the page
  static #setupEventListeners () {

  }
}