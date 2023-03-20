import './css/styles.css';
import refs from './refs.js'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;
let markup = null;


refs.input.addEventListener('input', debounce(onGetInputValue, DEBOUNCE_DELAY));

function onGetInputValue(e) {
  const sanitazeString = e.target.value.trim();
  fetchCountries(sanitazeString)
    .then(createMarkup)
    // .then(renderingMarkup)
    .catch(error => {
      if (sanitazeString) {
        Notiflix.Notify.failure('Oops, there is no country with that name', {
          timeout: 2000,
        });
      }
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      return;
    });
}

function createMarkup(items) {
  if (items.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      { timeout: 5000 }
    );
     return '';
  }
  if (items.length > 1) {
    refs.countryList.innerHTML = items
      .map(({ name, capital, population, flags, languages }) => {
        return `<li class="country-items">
       <img  class="image-Flag" src="${flags.svg}" width= 32 height = 20 alt="${name.official}">
       <h1 class ="country-list-title">${name.official}</h1>
     </li>`;
      })
      .join('');
    refs.countryInfo.innerHTML = '';
  } else {
    refs.countryInfo.innerHTML = items
      .map(({ name, capital, population, flags, languages }) => {
        return `<div class ="counrty-wrapper"><img  class="image-Flag" src="${flags.svg}"  width= 40 height = 30 alt="${name.official}">
            <h1 class ="country-info-title">${name.official}</h1> </div>
            <p> Capital: <span>${capital}</span></p>
            <p>Population: <span>${population}</span></p>
            <p>Languages: <span>${Object.values(languages).join(', ')}</span></p>`;
      })
      .join('');
    refs.countryList.innerHTML = '';
  }
}

