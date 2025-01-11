// Create a new element GenreBadgeComponent and return it
import { firstLetterToUpper } from '../utils/utils.js'

const GenreBadge = (genre) => {
  const badge = document.createElement('a')
  badge.setAttribute('data-router', true)
  badge.setAttribute('href', `/genres/${genre}`)
  badge.className = 'inline-block mx-0.5 bg-gray-400 text-gray-700 rounded-full hover:bg-gray-200'

  badge.innerHTML = `
    <span 
    class="inline-block text-black px-3 py-1 text-sm font-bold mb-1"
    >
      ${firstLetterToUpper(genre)}
    </span>
  `

  return badge
}

export default GenreBadge
