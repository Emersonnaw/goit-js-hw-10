

export default  function fetchCountries(countryName) {
    const queryParameters = '?fields=name,capital,population,flags,languages';
   return fetch(`https://restcountries.com/v3.1/name/${countryName}${queryParameters}`).then(response => {
    //console.log(response)
    return response.json() //return data
    })
}