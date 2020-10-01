import React from 'react';
import CountryCard from './CountryCard';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home({countries, darkMode}) {

  const [filteredCountries, setFilteredCountries] = useState([]);

  const [filter, setFilter] = useState("");

  const [regionFilterToggle, setRegionFilterToggle] = useState(false);

  const [regionFilter, setRegionFilter] = useState("None");

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania", "None"];

  useEffect(() => {
    setFilteredCountries (countries);
  }, [countries]);

  useEffect(() => {
    setFilteredCountries (countries);
    if (regionFilter !== "None"){
      setFilteredCountries(prev => prev.filter(country => country.region === regionFilter));
    }
    let filter1 = filter.trim().toLowerCase();
    setFilteredCountries (prev => prev.filter(country => country.name.toLowerCase().search(filter1) !== -1));
  }, [filter, regionFilter]);

  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
  }

  const regionFilterToggleHandler = () => {
    setRegionFilterToggle(prev => !prev);
  }

  const regionFilterHandler = (e) => {
    if (e.target.innerText === "America")
    {
      setRegionFilter("Americas");
    }
    else {
      setRegionFilter(e.target.innerText);
    }
    setRegionFilterToggle(prev => !prev);
  }

  return (
    <div className={darkMode ? "home main-dark" : "home main-light"}>
        <div className="container">
            <div className="search-and-filter">
              <form className = {darkMode ? "element-dark" : "element-light"}>
                <span className="search-icon-wrapper">
                  <FontAwesomeIcon icon={["fas", "search"]} />
                </span>
                <input type="text" value={filter} onChange={filterChangeHandler} placeholder="Search for a country..."/>
              </form>
              <div className={darkMode ? "region-filter-wrapper element-dark" : "region-filter-wrapper element-light"}>
                <button onClick={regionFilterToggleHandler}>
                  <span>Filter {regionFilter === "None" ? "by Region" : `(${regionFilter})`}</span>
                  <span className="arrow-icon-wrapper">
                    <FontAwesomeIcon icon={regionFilterToggle ? ["fas", "chevron-up"] : ["fas", "chevron-down"]} />
                  </span>
                </button>
                <div className="region-filter-choices" style={{display: regionFilterToggle ? "flex" : "none"}}>
                  <ul>
                    {regions.map(region => (
                      <li onClick={regionFilterHandler} key={region}>{region}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
              <div className="countries">
                {filteredCountries.map(country => (
                    <CountryCard
                    key={country.name}
                    countryData={country}
                    darkMode={darkMode}
                    />
                ))}
              </div>
        </div>
    </div>
  );
}

export default Home;