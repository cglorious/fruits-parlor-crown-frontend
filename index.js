const CATEGORIES_URL = `http://localhost:3000/api/v1/categories`
const CHARACTERS_URL = `http://localhost:3000/api/v1/characters`
const IMAGE_URL = `https://ih1.redbubble.net/image.361175264.4945/st,small,845x845-pad,1000x1000,f8f8f8.u5.jpg`

document.addEventListener('DOMContentLoaded', () => {
  loadCategories()
})

function loadCategories(){
  fetch(CATEGORIES_URL)
  .then(resp => resp.json())
  .then(json => {
    json.data.forEach(category => loadOptions(category));
  })
}

function loadOptions(option){
  const dropdown = document.getElementById('dropdown-menu')
  const btn = document.createElement('button')

  btn.setAttribute('id', option.id)
  btn.setAttribute('class', "dropdown-item")
  btn.setAttribute('type', 'button')
  btn.innerText = `${option.attributes.name}s`
  btn.addEventListener("click", (e) => {fetchCharacters(e.target.id)});

  dropdown.append(btn)
}

function fetchCharacters(value){
  fetch(`${CATEGORIES_URL}/${value}`)
  .then(resp => resp.json())
  .then(json => {
  changeHeader(json.data);
  json.data.attributes.characters.forEach(character => renderCharacter(character))
})
}

function changeHeader(option){
  const header = document.getElementById('display-4')
  const description = document.getElementById('lead')
  const p = document.getElementById('content')
  const dropdown = document.getElementById('dropdown')

  header.textContent = `The ${option.attributes.name}s`
  description.textContent = "Moon mochi is sticky. It puffs up when grilled."
  p.textContent = `Here is a list of known ${option.attributes.name}s.`

  dropdown.remove();
}

function renderCharacter(char){
  const container = document.getElementById('character-container')

  //create nodes
  const card = document.createElement('div')
  const row = document.createElement('div')
  const col4 = document.createElement('div')
  const img = document.createElement('img')
  const col8 = document.createElement('div')
  const cardBody = document.createElement('div')
  const h5 = document.createElement('h5')
  const bio = document.createElement('p')
  const power = document.createElement('p')
  const afn = document.createElement('p')
  const smallPower = document.createElement('small')
  const smallAfn = document.createElement('small')

  //set attributes
  card.setAttribute('class','card mb-3')
  row.setAttribute('class','row no-gutters')
  col4.setAttribute('class','col-md-4')
  img.setAttribute('class','card-img')
  img.setAttribute('alt',`${char.name}`)
  img.setAttribute('src', IMAGE_URL)
  col8.setAttribute('class','col-md-8')
  cardBody.setAttribute('class','card-body')
  h5.setAttribute('class','card-title')
  bio.setAttribute('class','card-text')
  power.setAttribute('class','card-text')
  power.setAttribute('style','font-style: italic')
  afn.setAttribute('class','card-text')
  smallAfn.setAttribute('class', 'text-muted')

  //set inner content
  h5.textContent = `${char.name}, ${char.title}`
  bio.textContent = `${char.bio}`
  smallPower.textContent = `${char.power}`
  smallAfn.textContent = `${char.affiliation}`

  //append nodes
  col4.append(img)
  power.append(smallPower)
  afn.append(smallAfn)
  cardBody.append(h5, bio, power, afn)
  col8.append(cardBody)
  row.append(col4, col8)
  card.append(row)
  container.append(card)
  console.log(char.name)
}

function optionHeader(option){
  const header = document.getElementById('option-header')
  const jumbotron = document.createElement('div')
  const container = document.createElement('div')
  const h1 = document.createElement('h1')
  const p = document.createElement('p')

  jumbotron.setAttribute('class', 'jumbotron jumbotron-fluid')
  container.setAttribute('class', 'container')
  h1.setAttribute('class', 'display-4')
  p.setAttribute('class', 'lead')

  h1.textContent = `The ${option.attributes.name}s`
  p.textContent = `Here is a list of known ${option.attributes.name}s.`

  container.append(h1, p)
  jumbotron.append(container)
  header.append(jumbotron)
}
