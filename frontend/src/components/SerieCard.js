// New component

const SerieCard = () => {
  const card = document.createElement('article')
  card.classList.add('card')
  card.innerHTML = `
        <h1>Hello World</h1>
    `

  return card
}

export default SerieCard