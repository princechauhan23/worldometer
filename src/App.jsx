import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WorldMap from "./components/WorldMap";
import CountryDetails from "./components/CountryDetails";
import "./App.css";

function App() {
  // India is the default country to show some data on the page load
  const [countrySelected, setCountrySelected] = useState("india");

  return (
    <div className="AppContainer">
      <header className="AppHeader"> Worldometer </header>
      <SearchBar setCountrySelected={setCountrySelected} />
      <div className="mainSection">
        <WorldMap setCountrySelected={setCountrySelected} />
        <CountryDetails countrySelected={countrySelected} />
      </div>
    </div>
  );
}

export default App;
