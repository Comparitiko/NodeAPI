// Error: <p class="text-red-500 text-xs italic">Please choose a password.</p>

import { EVENTS } from '../consts/events.js'
import { serieService } from '../services/serieService.js'
import SerieCard from './SerieCard.js'

export const AddSerieModal = (id) => {
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 bg-slate-700 bg-opacity-50 h-full w-full hidden z-10'
  modal.id = id
  modal.innerHTML = `
          <div class="relative top-10 bottom-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-gray-300 max-h-[90vh] flex flex-col">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Añadir una serie</h3>
                <div class="mt-2 px-7 py-3 max-h-[70vh] overflow-auto scroll-m-5 scroll-smooth">
                  <form id="new-serie-form" class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                        Titulo de la Serie
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" required>
                    </div>
                    <div class="mb-6">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Descripción
                      </label>
                      <textarea class="shadow resize-none h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" required></textarea>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="rating">
                        Valoración
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rating" type="number" max="5" min="1" required>
                    </div>
                    <div class="mb-4 text-left">
                      <label class=" text-gray-700 font-bold">
                        <span class="mr-2 text-md">
                          ¿Es miniserie?
                        </span>
                        <input class="leading-tight" type="checkbox" id="isMiniSerie">
                      </label>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="numOfSeasons">
                        Numero de temporadas
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numOfSeasons" type="number" min="1" required>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="numOfSeasons">
                        Año de lanzamiento
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="year" type="number" min="1900" required>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="genres">
                        Generos de la serie
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="genres" placeholder="Drama, Comedia, Acción, Aventura..." type="text" required>
                    </div>
                    <div class="mt-4 flex flex-col items-center justify-center">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        <span class="flex items-center">
                          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          Subir archivo
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          aria-label="Subir archivo"
                          required
                        />
                      </label>
                    </div>
                    <div class="mt-4 flex flex-col items-center justify-center">
                      <button id="add-serie" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Añadir
                      </button>
                  </form>
                </div>
            </div>
            <div class="items-center px-4 py-3">
                    <button id="closeModal" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Cerrar
                    </button>
            </div>
          </div>
      </div>
      `

    // Setup the events listeners for the modal
    const form = modal.querySelector('#new-serie-form')
    form.addEventListener(EVENTS.SUBMIT, async (event) => {
      event.preventDefault()

      let imageUrl = ''

      const image = form.querySelector('#file-upload').files[0]
      const resImage = await serieService.uploadImage(image)
      if (resImage.ok) {
        // If the image is uploaded, get the url of the image
        imageUrl = resImage.message.url
      } else {
        // If there is an error uploading the image, show an error message and return
        console.error(resImage.message)
        return
      }

      // If there are no errors, add the serie
      const title = form.querySelector('#title').value
      const rating = parseInt(form.querySelector('#rating').value)
      const description = form.querySelector('#description').value
      const isMiniSerie = form.querySelector('#isMiniSerie').checked
      const numOfSeasons = parseInt(form.querySelector('#numOfSeasons').value)
      const year = parseInt(form.querySelector('#year').value)
      const genres = form.querySelector('#genres').value.split(', ')

      const res = await serieService.create(title, rating, description, isMiniSerie, numOfSeasons, year, genres, imageUrl)

      if (res.ok) {
        // If the serie is added, renavigate to the series page
        const seriesList = document.querySelector('#series-list')
        seriesList.appendChild(SerieCard(res.serie))
        modal.classList.add('hidden')
        window.scrollTo(0, screen.height)
      } else {
        // If there is an error adding the serie, show an error message and return
        console.error(res.message)
      }
    })

    return modal
}