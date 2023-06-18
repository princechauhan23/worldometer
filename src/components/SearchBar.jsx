import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { fetchCountryList } from "../api/index.js";

const SearchBar = ({ setCountrySelected }) => {
  const [searchInput, setSearchInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  //fetching the list of countries
  useEffect(() => {
    const list = [];
    const getCountries = async () => {
      const unsub = async () => {
        const data = await fetchCountryList();
        data.map((item) => {
          list.push([item.name.common, item.flags.png]);
        });
      };
      await unsub();
      setCountries(list);
    };
    getCountries();
  }, []);

  //function to handle search
  const filetrCon = [];
  const handleSearch = () => {
    countries.filter((item) => {
      if (item[0].toLowerCase().includes(searchInput.toLowerCase())) {
        filetrCon.push(item);
      }
    });
    // set the filtered countries to the state
    setFilteredCountries(filetrCon);
  };

  //   rendering the search results
  const renderlist = [];
  const renderSearchResults = () => {
    filteredCountries.map((item) => {
      renderlist.push(
        <div
          className="searchResult"
          onClick={() => {
            setCountrySelected(item[0]);
            setSearchInput("");
          }}
        >
          <span className="imgspan">
            <img src={item[1]} />
          </span>
          <div>{item[0]}</div>
        </div>
      );
    });

    return renderlist;
  };

  //   closing the search results when clicked outside the search bar
  document.getElementById("root").addEventListener("click", () => {
    setSearchInput("");
  });

  return (
    <div className="searchBar-container">
      <div className="searchBar">
        {searchInput === "" ? (
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#54656f" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: "#54656f" }}
            onClick={() => setSearchInput("")}
          />
        )}
        <input
          type="text"
          name="search"
          value={searchInput}
          autoComplete="off"
          onKeyUp={handleSearch}
          placeholder="Search or type a country"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {searchInput !== "" ? (
        <div className="searchResultContainer">{renderSearchResults()}</div>
      ) : null}
    </div>
  );
};

export default SearchBar;
