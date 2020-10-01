import React from 'react';
import { useHistory } from 'react-router-dom';

function CountryCard({countryData, darkMode}) {

  const history = useHistory();

  const goToCountry = () => {
    history.push(`/${countryData.name.replace(/\s|\(|\)/g, '')}`);
  }

  return (
    <div className={darkMode ? "country-card element-dark" : "country-card element-light"} onClick={goToCountry}>
      <div className="flag-container">
        <img src={countryData.flag} alt={`Flag of ${countryData.name}`}/>
      </div>
      <div className="country-info-container">
        <h3>{countryData.name}</h3>
        <ul>
          <li>
            <strong>Population: </strong>
            <span>{countryData.population.toLocaleString('en', {useGrouping:true})}</span>
          </li>
          <li>
            <strong>Region: </strong>
            <span>{countryData.region}</span>
          </li>
          <li>
            <strong>Capital: </strong>
            <span>{countryData.capital}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CountryCard;