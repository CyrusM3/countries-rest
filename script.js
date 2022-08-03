const header = document.querySelector('.header');
const sticky = header.offsetTop;
const countriesElement = document.getElementById('countries');
const toggleButton = document.getElementById('toggle');
const filterButton = document.getElementById('filter');
const regionFilters = filterButton.querySelectorAll('li');
const searchElement = document.getElementById('search');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close');

const url = 'https://restcountries.com/v3.1/all';

// Sticky header
function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

window.onscroll = function () {
  stickyHeader();
};

const getCountries = async function () {
  const response = await fetch(url);
  const countries = await response.json();
  console.log(countries);
  displayCountries(countries);
};
getCountries();

function displayCountries(countries) {
  countriesElement.innerHTML = '';
  countries.forEach((country) => {
    const countryElement = document.createElement('div');
    countryElement.classList.add('card');
    countryElement.innerHTML = `    
    <div>
    <img src="${country.flags.png}" alt="flag" />
    </div>
    <div class="card-body">
    <h3 class="country-name">${country.name.common}</h3>
    <p><strong>Population:</strong> ${country.population}</p>
    <p class="country-region"><strong>Region:</strong> ${country.region}</p>
    <p><strong>Capital:</strong> ${country.capital}</p>
    </div>       
    `;
    // modal-control
    countryElement.addEventListener('click', () => {
      modal.style.display = 'flex';
      showCountryDetails(country);
    });

    countriesElement.appendChild(countryElement);
  });
}

// Modal country details
function showCountryDetails(country) {
  const modalBody = modal.querySelector('.modal-body');
  const modalImage = modal.querySelector('img');
  const currencies = country.currencies;
  const languages = country.languages;
  console.log(languages);

  modalImage.src = country.flags.png;

  modalBody.innerHTML = `
  <h2>${country.name.common}</h2>
  <p><strong>Native Name:</strong> ${country.name.official}</p>
  <p><strong>Population:</strong> ${country.population}</p>
  <p>
  <strong>Region:</strong> ${country.region}
  </p>
  <p>
  <strong>Sub Region:</strong> ${country.subregion}
  </p>
  <p><strong>Capital:</strong> ${country.capital}</p>
  <p><strong>Top Level Domain:</strong> ${country.tld[0]}</p>   
  `;

  let currency;
  for (currency in currencies) {
    modalBody.innerHTML =
      modalBody.innerHTML + `<p><strong>Currencies:</strong> ${currency}</p>`;
  }

  let language;
  for (language in languages) {
    modalBody.innerHTML =
      modalBody.innerHTML + `<p><strong>Languages:</strong> ${language}</p>`;
  }
}

// Toggle Theme - dark & light Mode
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Show and hide the filters(li tags)
filterButton.addEventListener('click', () => {
  filterButton.classList.toggle('open');
});

// Close the modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

searchElement.addEventListener('input', (e) => {
  const { value } = e.target;
  const countryName = document.querySelectorAll('.country-name');
  countryName.forEach((name) => {
    console.log(name.innerText);
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      // .card -> .card-body -> .country-name
      name.parentElement.parentElement.style.display = 'block';
    } else {
      name.parentElement.parentElement.style.display = 'none';
    }
  });
});

// Add a filter on the li's inside the .dropdown
regionFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll('.country-region');

    countryRegion.forEach((region) => {
      if (region.innerText.includes(value) || value === 'All') {
        // .card -> .card-body -> .country-region
        region.parentElement.parentElement.style.display = 'block';
      } else {
        region.parentElement.parentElement.style.display = 'none';
      }
    });
  });
});
