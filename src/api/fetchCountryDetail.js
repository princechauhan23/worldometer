// cache country detail to avoid multiple fetch
const cacheCountry = [];

// Fetch country detail function with cache
const CountryDetail = async (countrySelected) => {
  try {
    if (
      cacheCountry.filter((country) => country.name.common === countrySelected)
        .length > 0
    ) {
      return cacheCountry.filter(
        (country) => country.name.common === countrySelected
      );
    }

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countrySelected}`
    );
    const data = await response.json();
    cacheCountry.push(data[0]);
    return data;
  } catch (error) {
    console.log(error, "error");
  }
};

export default CountryDetail;
