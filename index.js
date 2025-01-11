const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')
function renderCountries(data, string) {
    data.forEach((country) => {
        // console.log(country)
        const countryname = country.name.common;
        const countryCard = document.createElement('a')
        countryCard.href = `./countrydata.html?name=${country.name.common}`
        // console.log(countryCard)
        countryCard.classList.add('conutry-card')
        const cardHTML = ` <img src=${country.flags.svg} alt="">
        <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital}</p>
                        </div>
                        `
        countryCard.innerHTML = cardHTML
        if (countryname.toUpperCase().includes(string.toUpperCase())) {
            countriesContainer.append(countryCard)
        }

    })
}
if (filterByRegion.value === 'Filter by Region' || searchInput.value == '') {
    countriesContainer.innerHTML = '';
    fetch('https://restcountries.com/v3.1/all').then((res) => res.json()).then((data) => {
        renderCountries(data, '');
    })
}
filterByRegion.addEventListener('change', (e) => {
    if (filterByRegion.value === 'Filter by Region') {
        countriesContainer.innerHTML = '';
        fetch('https://restcountries.com/v3.1/all').then((res) => res.json()).then((data) => {
            renderCountries(data,searchInput.value);
        })
    } else {
        countriesContainer.innerHTML = '';
        fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res) => res.json()).then((data) => {
            renderCountries(data,searchInput.value);
        })
    }

})
searchInput.addEventListener('input', (e) => {
    // console.log(searchInput.value)
    countriesContainer.innerHTML = '';  
    fetch('https://restcountries.com/v3.1/all').then((res) => res.json()).then((data) => {
        renderCountries(data,e.target.value);
    })
})

themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
})
console.log(searchInput.value)

