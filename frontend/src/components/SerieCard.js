// New component

import GenreBadge from './GenreBadge.js'

const SerieCard = (serie) => {
  console.log(serie.genres)

  const genres = serie.genres.map((genre) => GenreBadge(genre)).join('')

  const card = `
    <article class="card">
      <img class="w-full h-96 object-contain" src="${serie.image}" alt="Serie ${
    serie.title
  } Poster">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${serie.title}</div>
        <p class="text-gray-300 text-base mb-2">${serie.description}</p>
        <p class="text-sm text-gray-300 mb-1">
          <span class="font-semibold">Tipo:</span> 
          <span class="bg-blue-300 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${
    serie.isMiniSerie ? 'Miniserie' : 'Serie'
  }</span>
        </p>
        <p class="text-sm text-gray-300 mb-1"><span class="font-semibold">Temporadas: </span>${
    serie.numOfSeasons
  }</p>
        <p class="text-sm text-gray-300 mb-1"><span class="font-semibold">Año de publicación:</span> ${
    serie.year
  }</p>
        <div class="flex items-center mb-2">
          <span class="text-sm text-gray-300 font-semibold mr-2">Puntuación:</span>
          <span class="bg-green-300 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">${(
    serie.totalRatingCount / serie.totalVotes
  ).toFixed(2)} / 5</span>
        </div>
        <div class="px-1 py-1">
        ${genres}
      </div>
      </div>
    </article>
    `
  return card
}

export default SerieCard
