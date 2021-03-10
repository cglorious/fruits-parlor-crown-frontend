const CATEGORIES_URL = `http://localhost:3000/api/v1/categories`
const CHARACTERS_URL = `http://localhost:3000/api/v1/characters`
const IMAGE_URL = `https://ih1.redbubble.net/image.361175264.4945/st,small,845x845-pad,1000x1000,f8f8f8.u5.jpg`

document.addEventListener('DOMContentLoaded', () => {
  openProgram()
})

//entrance
function openProgram(){
  const entrance = document.getElementById('entrance')
  entrance.addEventListener('click', () => {
    removeEntrance()
    loadHeader()
  })
}

function removeEntrance(){
  const div = document.getElementById('entrance-div')
  div.remove();
}

function loadHeader(){
  const header = document.getElementById('welcome-header')
  const jumbotron = document.createElement('div')
  const h1 = document.createElement('h1')
  const lead = document.createElement('p')
  const hr = document.createElement('hr')
  const content = document.createElement('p')
  const dropdown = document.createElement('div')
  const btn = document.createElement('button')
  const menu = document.createElement('div')

  jumbotron.setAttribute('class', 'jumbotron')
  h1.setAttribute('class', 'display-4')
  h1.setAttribute('id', 'display-4')
  lead.setAttribute('class', 'lead')
  lead.setAttribute('id', 'lead')
  hr.setAttribute('class', 'my-4')
  content.setAttribute('id', 'content')
  dropdown.setAttribute('class', 'dropdown')
  dropdown.setAttribute('id', 'dropdown')
  btn.setAttribute('class', 'btn btn-secondary dropdown-toggle')
  btn.setAttribute('type', 'button')
  btn.setAttribute('id', 'dropdownMenu2')
  btn.setAttribute('data-toggle', 'dropdown')
  btn.setAttribute('aria-haspopup', 'true')
  btn.setAttribute('aria-expanded', 'false')
  menu.setAttribute('class', 'dropdown-menu')
  menu.setAttribute('id', 'dropdown-menu')
  menu.setAttribute('aria-labelledby', 'dropdownMenu2')

  h1.innerText = "Welcome, Luna."
  lead.innerText = "The Rabbit on the Moon bakes Mochi cakes."
  content.innerText = "Code name 0091."
  btn.innerText = "About"

  dropdown.append(btn, menu)
  jumbotron.append(h1, lead, hr, content, dropdown)
  header.append(jumbotron)

  fetchCategories()
}

//categories
function fetchCategories(){
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
  btn.addEventListener("mouseup", (e) => changeProfileView())

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

function changeProfileView(){
  const parent = document.getElementById('category-option')
  let header = document.getElementById('form-header')

  if (parent.hasChildNodes()) {
    parent.innerText = "";
    header.innerText = "";
  }
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
  col8.setAttribute('class','col-md-8')
  cardBody.setAttribute('class','card-body')
  h5.setAttribute('class','card-title')
  bio.setAttribute('class','card-text')
  power.setAttribute('class','card-text')
  power.setAttribute('style','font-style: italic')
  afn.setAttribute('class','card-text')
  smallAfn.setAttribute('class', 'text-muted')

  //set inner content
  img.src = `${char.image_url}`
  img.alt = `${char.name}`
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
  btn.addEventListener("click", () => addProfileForm());

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
  const powerTextarea = document.createElement('textarea')

  //bio
  const bioDiv = document.createElement('div')
  const bioLabel = document.createElement('label')
  const bioTextarea = document.createElement('textarea')

  //image_url
  const imgDiv = document.createElement('div')
  const imgLabel = document.createElement('label')
  const imgInput = document.createElement('input')

  const btn = document.createElement('button')

  form.setAttribute('id', 'form')

  categoryDiv.setAttribute('class', 'form-group')
  categoryLabel.setAttribute('for', 'category')
  categorySelect.setAttribute('class', 'form-control')
  categorySelect.setAttribute('id', 'category')
  optionG.setAttribute('value', '1')
  optionV.setAttribute('value', '2')

  nameDiv.setAttribute('class', 'form-group')
  nameLabel.setAttribute('for', 'name-input')
  nameInput.setAttribute('type', 'text')
  nameInput.setAttribute('class', 'form-control')
  nameInput.setAttribute('id', 'name-input')
  nameInput.setAttribute('placeholder', 'Usagi Tsukino')

  titleDiv.setAttribute('class', 'form-group')
  titleLabel.setAttribute('for', 'title-input')
  titleInput.setAttribute('type', 'text')
  titleInput.setAttribute('class', 'form-control')
  titleInput.setAttribute('id', 'title-input')
  titleInput.setAttribute('placeholder', 'Sailor Moon')

  afnDiv.setAttribute('class', 'form-group')
  afnLabel.setAttribute('for', 'afn-input')
  afnInput.setAttribute('type', 'text')
  afnInput.setAttribute('class', 'form-control')
  afnInput.setAttribute('id', 'afn-input')
  afnInput.setAttribute('placeholder', 'Inner Sailor Scouts')

  powerDiv.setAttribute('class', 'form-group')
  powerLabel.setAttribute('for', 'power-textarea')
  powerTextarea.setAttribute('class', 'form-control')
  powerTextarea.setAttribute('id', 'power-textarea')
  powerTextarea.setAttribute('rows', '3')

  bioDiv.setAttribute('class', 'form-group')
  bioLabel.setAttribute('for', 'bio-textarea')
  bioTextarea.setAttribute('class', 'form-control')
  bioTextarea.setAttribute('id', 'bio-textarea')
  bioTextarea.setAttribute('rows', '3')

  imgDiv.setAttribute('class', 'form-group')
  imgLabel.setAttribute('for', 'img-input')
  imgInput.setAttribute('type', 'text')
  imgInput.setAttribute('class', 'form-control')
  imgInput.setAttribute('id', 'img-input')
  imgInput.setAttribute('placeholder', 'https://')

  btn.setAttribute('type', 'submit')
  btn.setAttribute('class', 'btn btn-primary btn-lg btn btn-info')

  categoryLabel.textContent = "Category"
  optionG.textContent = "Guardian"
  optionV.textContent = "Villian"
  nameLabel.textContent = "Name"
  titleLabel.textContent = "Title"
  afnLabel.textContent = "Affiliation"
  powerLabel.textContent = "Power"
  bioLabel.textContent = "Bio"
  imgLabel.textContent = "Image URL"
  btn.textContent = "Submit"

  form.addEventListener("submit", (e) => {
    formHandler(e);
  });

  categorySelect.append(optionG, optionV)
  categoryDiv.append(categoryLabel, categorySelect)
  nameDiv.append(nameLabel, nameInput)
  titleDiv.append(titleLabel, titleInput)
  afnDiv.append(afnLabel, afnInput)
  powerDiv.append(powerLabel, powerTextarea)
  bioDiv.append(bioLabel, bioTextarea)
  imgDiv.append(imgLabel, imgInput)
  form.append(categoryDiv, nameDiv, titleDiv, afnDiv, powerDiv, bioDiv, imgDiv, btn)
  container.append(form)
}

function formHandler(e){
  e.preventDefault()

  const categoryId = parseInt(document.querySelector('#category').value)
  const name = document.querySelector('#name-input').value
  const title = document.querySelector('#title-input').value
  const afn = document.querySelector('#afn-input').value
  const power = document.querySelector('#power-textarea').value
  const bio = document.querySelector('#bio-textarea').value
  const img = document.querySelector('#img-input').value

  const values = [name, title, afn, power, bio, img]
  const found = values.find(element => element === "")

  if (found === ""){
    formError()
  } else {
    postFetch(categoryId, name, title, afn, power, bio, img)
  }
}

function postFetch(category_id, name, title, affiliation, power, bio, image_url){
  const bodyData = {category_id, name, title, affiliation, power, bio, image_url}
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(bodyData)
  }

  fetch(CHARACTERS_URL, configObj)
    .then(res => res.json())
    .then(json => {
      fetchCharacters(category_id)
    })

  removeForm();
  changeProfileView();
}

function removeForm(){
  const form = document.querySelector('#form')
  const err = document.getElementById('form-error')

  if (form) { form.remove() }
  if (err !== ""){ err.innerText = ""; }
}

function formError() {
  const err = document.getElementById('form-error')
  err.setAttribute('style', 'color:red; text-align:center;')
  err.innerText = "Please complete all fields."
}
