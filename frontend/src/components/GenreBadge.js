const GenreBadge = (genre) => {
  const badge = `
    <span 
    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-1"
    >
      ${genre}
    </span>
  `

  return badge
}

export default GenreBadge
