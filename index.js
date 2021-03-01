const CATEGORIES_URL = `http://localhost:3000/api/v1/categories`
const CHARACTERS_URL = `http://localhost:3000/api/v1/characters`

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
  optionHeader(json.data);
})
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

  console.log(option.attributes.name)
  // const div = document.getElementById('chart')
  // const h2 = document.createElement('h2')
  // const jobs = chart.attributes.jobs
  //
  // h2.setAttribute('class', 'chart-title')
  // h2.innerText = `${chart.attributes.name} Chart`
  // div.append(h2)
  //
  // renderJobs(jobs)
}
