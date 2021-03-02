const CATEGORIES_URL = `http://localhost:3000/api/v1/categories`
const CHARACTERS_URL = `http://localhost:3000/api/v1/characters`
const IMAGE_URL = `https://ih1.redbubble.net/image.361175264.4945/st,small,845x845-pad,1000x1000,f8f8f8.u5.jpg`

document.addEventListener('DOMContentLoaded', () => {
  loadProgram()
})

//categories
function loadProgram(){
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
  btn.innerText = `${option.attributes.name}`
  btn.addEventListener("click", (e) => {fetchCharacters(e.target.id)});
  btn.addEventListener("mouseup", (e) => changeProfiles())

  dropdown.append(btn)
}

//characters
function fetchCharacters(value){
  fetch(`${CATEGORIES_URL}/${value}`)
  .then(resp => resp.json())
  .then(json => {
    changeHeader(json.data);
    json.data.attributes.characters.forEach(character => renderCharacter(character))
  })
}

function changeProfiles(){
  const parent = document.getElementById('category-option')
  let totalChildren = document.getElementById('category-option').children.length
  //const formHeader = document.getElementById('form-header')

  if (parent.hasChildNodes()) {
    while (totalChildren > 0)
      parent.childNodes[0].remove();
  } //cannot read property of undefined - console error

  addProfileHeader()
}

function changeHeader(option){
  const header = document.getElementById('display-4')
  const description = document.getElementById('lead')
  const p = document.getElementById('content')

  header.textContent = `The ${option.attributes.name}s`
  description.textContent = "Moon mochi is sticky. It puffs up when grilled."
  p.textContent = `Here is a list of known ${option.attributes.name}s.`
}

function renderCharacter(char){
  const option = document.getElementById('category-option')
  const container = document.createElement('div')

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
  container.setAttribute('class', 'container')
  container.setAttribute('id', `${char.category_id}`)
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
  option.append(container)
}

function addProfileHeader(){
  const formHeader = document.getElementById('form-header')
  const jumbotron = document.createElement('div')
  const container = document.createElement('div')
  const h1 = document.createElement('h1')
  const p = document.createElement('p')
  const btn = document.createElement('button')

  jumbotron.setAttribute('class', 'jumbotron jumbotron-fluid')
  container.setAttribute('class', 'container')
  h1.setAttribute('class', 'display-4')
  p.setAttribute('class', 'lead')
  btn.setAttribute('class', 'btn btn-primary btn-lg btn btn-info')

  h1.textContent = "Add a Profile"
  p.textContent = "Have you met someone new? Add their profile here."
  btn.textContent = "Add Profile"
  //on click render addProfileForm

  container.append(h1, p, btn)
  jumbotron.append(container)
  formHeader.append(jumbotron)
}

function addProfileForm(){
  const container = document.getElementById('form-container')
  const form = document.createElement('form')

  //category
  const categoryDiv = document.createElement('div')
  const categoryLabel = document.createElement('label')
  const categorySelect = document.createElement('select')
  const optionG = document.createElement('option')
  const optionV = document.createElement('option')

  //name
  const nameDiv = document.createElement('div')
  const nameLabel = document.createElement('label')
  const nameInput = document.createElement('input')

  //title
  const titleDiv = document.createElement('div')
  const titleLabel = document.createElement('label')
  const titleInput = document.createElement('input')

  //affiliation
  const afnDiv = document.createElement('div')
  const afnLabel = document.createElement('label')
  const afnInput = document.createElement('input')

  //power
  const powerDiv = document.createElement('div')
  const powerLabel = document.createElement('label')
  const powerTextArea = document.createElement('input')

  //bio
  const bioDiv = document.createElement('div')
  const bioLabel = document.createElement('label')
  const bioTextArea = document.createElement('textarea')

  const btn = document.createElement('button')

}
