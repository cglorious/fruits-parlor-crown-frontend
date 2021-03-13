const CATEGORIES_URL = `http://localhost:3000/api/v1/categories`
const CHARACTERS_URL = `http://localhost:3000/api/v1/characters`
const IMAGE_URL = `https://ih1.redbubble.net/image.361175264.4945/st,small,845x845-pad,1000x1000,f8f8f8.u5.jpg`

//set attribute helper method
setAttributes = (el, attrs) => {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  openProgram()
})

//entrance and welcome page
openProgram = () => {
  const entrance = document.getElementById('entrance')
  entrance.addEventListener('click', () => {
    removeEntrance()
    loadWelcomePage()
    fetchCategories()
  })
}

removeEntrance = () => {
  const div = document.getElementById('entrance-div')
  div.remove();
}

loadWelcomePage = () => {
  const header = document.getElementById('welcome-header')
  const jumbotron = document.createElement('div')
  const h1 = document.createElement('h1')
  const lead = document.createElement('p')
  const hr = document.createElement('hr')
  const content = document.createElement('p')
  const dropdown = document.createElement('div')
  const btn = document.createElement('button')
  const menu = document.createElement('div')
  const div = document.createElement('div')
  const img = document.createElement('img')

  setAttributes(jumbotron, {'class': 'jumbotron'});
  setAttributes(h1, {'class': 'display-4','id': 'display-4'});
  setAttributes(lead, {'class': 'lead','id': 'lead'})
  hr.setAttribute('class', 'my-4')
  content.setAttribute('id', 'content')
  setAttributes(dropdown, {'class': 'dropdown','id': 'dropdown'})
  setAttributes(btn, {
    'class': 'btn btn-secondary dropdown-toggle',
    'type': 'button',
    'id': 'dropdownMenu2',
    'data-toggle': 'dropdown',
    'aria-haspopup': 'true',
    'aria-expanded': 'false'
  })
  setAttributes(menu, {
    'class': 'dropdown-menu',
    'id': 'dropdown-menu',
    'aria-labelledby': 'dropdownMenu2'
  })
  setAttributes(div, {'class': 'image-div', 'id': 'image-div'})
  setAttributes(img, {
    'class': 'rounded',
    'alt': 'Luna',
    'id': 'welcome-image',
    'style': 'width: 500px; height: 500px; display: block;'
  })

  h1.innerText = "Hello, Luna."
  lead.innerText = "The Rabbit on the Moon bakes Mochi cakes."
  //Moon mochi is sticky. It puffs up when grilled.
  content.innerText = "Choose an option below to learn more."
  btn.innerText = "About"
  img.src = IMAGE_URL

  div.append(img)
  dropdown.append(btn, menu)
  jumbotron.append(h1, lead, hr, content, dropdown)
  header.append(jumbotron, div)
}

//categories
fetchCategories = () => {
  fetch(CATEGORIES_URL)
  .then(resp => resp.json())
  .then(json => {
    json.data.forEach(category => loadOptions(category));
  })
}

loadOptions = (option) => {
  const dropdown = document.getElementById('dropdown-menu')
  const btn = document.createElement('button')

  setAttributes(btn, {
    'id': option.id,
    'class': 'dropdown-item',
    'type': 'button'
  })

  btn.innerText = `${option.attributes.name}`

  btn.addEventListener("click", (e) => {fetchCharacters(e.target.id)});
  btn.addEventListener("mouseup", (e) => {
    const welcomeImage = document.getElementById('image-div')
    if (welcomeImage){
      welcomeImage.remove()
    }
    changeProfileView()
  })

  dropdown.append(btn)
}

//characters
fetchCharacters = (value) => {
  fetch(`${CATEGORIES_URL}/${value}`)
  .then(resp => resp.json())
  .then(json => {
    changeHeader(json.data);
    json.data.attributes.characters.forEach(character => renderCharacter(character))
  })
}

changeProfileView = () => {
  const parent = document.getElementById('category-option')
  let header = document.getElementById('form-header')

  if (parent.hasChildNodes()) {
    parent.innerText = "";
    header.innerText = "";
  }
  addProfileHeader()
}

changeHeader = (option) => {
  const header = document.getElementById('display-4')
  const description = document.getElementById('lead')
  const p = document.getElementById('content')

  const text = {
    id: option.id,
    guardian: [`The ${option.attributes.name}s`, "Meet the champions of justice.", `Remember ${option.attributes.name}s, you must live for those that love you.`],
    villain: [`The ${option.attributes.name}s`, "It takes more than guts to beat the Negaverse.", `Beware. The ${option.attributes.name}s are seeking power and energy.`],
    guardianFunc : function() {
      header.textContent = this.guardian[0]
      description.textContent = this.guardian[1];
      p.textContent = text.guardian[2]
    },
    villainFunc : function() {
      header.textContent = this.villain[0]
      description.textContent = this.villain[1];
      p.textContent = text.villain[2]
    }
  }

  if (text.id === "1") {
    text.guardianFunc();
  } else {
    text.villainFunc();
  }
}

renderCharacter = (char) => {
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
  setAttributes(container, {'class': 'container', 'id': `${char.category_id}` })
  card.setAttribute('class','card mb-3')
  row.setAttribute('class','row no-gutters')
  col4.setAttribute('class','col-md-4')
  img.setAttribute('class','card-img')
  col8.setAttribute('class','col-md-8')
  cardBody.setAttribute('class','card-body')
  h5.setAttribute('class','card-title')
  bio.setAttribute('class','card-text')
  setAttributes(power, {'class': 'card-text', 'style': 'font-style: italic'})
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

addProfileHeader = () => {
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

addProfileForm = () => {
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

formHandler = (e) => {
  e.preventDefault()

  const categoryId = parseInt(document.querySelector('#category').value)
  const name = document.querySelector('#name-input').value
  const title = document.querySelector('#title-input').value
  const afn = document.querySelector('#afn-input').value
  const power = document.querySelector('#power-textarea').value
  const bio = document.querySelector('#bio-textarea').value
  const img = document.querySelector('#img-input').value

  const values = [name, title, afn, power, bio, img]
  const found =  values.find(element => element === "")

  if (found === ""){
    formError()
  } else {
    postFetch(categoryId, name, title, afn, power, bio, img)
  }
}

postFetch = (category_id, name, title, affiliation, power, bio, image_url) => {
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

removeForm = () => {
  const form = document.querySelector('#form')
  const err = document.getElementById('form-error')

  if (form) { form.remove() }
  if (err !== ""){ err.innerText = ""; }
}

formError = () => {
  const err = document.getElementById('form-error')
  err.setAttribute('style', 'color:red; text-align:center;')
  err.innerText = "Please complete all fields."
}
