const counrtyName=new URLSearchParams(window.location.search).get('name');
const flagImage=document.querySelector('.country-details img');
const  counrtyNameH1=document.querySelector('.country-details h1')
const nativeName = document.querySelector('.nativeName')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${counrtyName}?fullText=true`).then((res)=>res.json()).then(([country])=>{
    console.log(country);
    if(country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
      } else {
        nativeName.innerText = country.name.common
      }   
    console.log(Object.values(country.name.nativeName)[0].common);
   flagImage.src=country.flags.svg;
   counrtyNameH1.innerText=country.name.common
   population.innerText=country.population.toLocaleString('en-IN')
   region.innerText=country.region
   if (country.subregion) {
    subRegion.innerText = country.subregion
  }
   if (country.capital) {
    capital.innerText = country.capital?.[0]
  }
  topLevelDomain.innerText = country.tld.join(', ')
  if (country.languages) {
    languages.innerText = Object.values(country.languages).join(', ')
  }

  if (country.currencies) {
    currencies.innerText = Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(', ')
  }
  if(country.borders){
    const array=country.borders;
    array.forEach((country)=>{
      console.log(country);
      fetch(`https://restcountries.com/v3.1/alpha/${country}`).then((res)=>res.json()).then((data)=>{
        console.log(data);
        const x=document.querySelector('.bcountry');
        const b=document.createElement('a');
        b.innerText=data[0].name.common;
        x.append(b);
        b.href=`./countrydata.html?name=${data[0].name.common}`
      })
    })
  }
})









// const html=` <img src=${data[0].flags.svg} alt="">
// <div class="details-text-container">
//     <h1>${data[0].name.common}</h1>
//     <div class="details-text">

//         <p><b>Native Name: </b>${data[0].name.official}</p>
//         <p><b>Population: </b>${data[0].population.toLocaleString('en-IN')}</p>
//         <p><b>Region: </b>${data[0].region}</p>
//         <p><b>Sub Region: </b>${data[0].subregion}</p>
//         <p><b>Capital: </b${data[0].capital[0]}</p>
//         <p><b>Top Level Domain: </b>${data[0].tld[0]}</p>
//         <p><b>Currencies: </b>${data[0].currencies.Name} ${data[0].currencies.MXN.symbol} </p>
//         <p><b>Languages: </b>${data[0].languages.spa}</p>
//     </div>
//     <div class="border-countries"> 
//     <p><b>Border Countries: </b><a href="">France</a><a href="">Germany</a></p>  
//     </div>
// </div>`
// detail.innerHTML=html;