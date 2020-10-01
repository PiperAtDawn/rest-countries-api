import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CountryPage({country, countries, darkMode}) {

  const history = useHistory();

  const goBackHandler = () => {
    history.goBack();
  }

  const addCommas = () => {
    return country.population.toLocaleString('en', {useGrouping:true});
  }

  const getLanguages = () => {
    let languageList = "";
    for (let i = 0; i < country.languages.length; i++){
      if (i === 0) languageList = country.languages[i].name;
      else languageList = `${languageList}, ${country.languages[i].name}`;
    }
    return languageList;
  }

  const getCurrencies = () => {
    let currencyList = "";
    for (let i = 0; i < country.currencies.length; i++){
      if (i === 0) currencyList = country.currencies[i].name;
      else currencyList = `${currencyList}, ${country.currencies[i].name}`;
    }
    return currencyList;
  }

  const getNeighbors = () => {
    const neighborsShort = country.borders;
    const neighbors = countries.filter(c => neighborsShort.includes(c.alpha3Code));
    let neighborsLong = [];
    neighbors.forEach(neighbor => neighborsLong.push(neighbor.name));
    return neighborsLong;
  }

  const neighborLinkHandler = (e) => {
    history.push(`/${e.target.innerText.replace(/\s|\(|\)/g, '')}`);
  }

  const countryDataArr = [{id:1, label: "Native Name", content: country.nativeName},
                          {id: 2, label: "Population", content: addCommas()},
                          {id: 3, label: "Region", content: country.region},
                          {id: 4, label: "Sub Region", content: country.subregion},
                          {id: 5, label: "Capital", content: country.capital},
                          {id: 6, label: "Top Level Domain", content: country.topLevelDomain},
                          {id: 7, label: "Currencies", content: getCurrencies()},
                          {id: 8, label: "Languages", content: getLanguages()}]

  return (
    <div className={darkMode ? "country-page main-dark" : "country-page main-light"}>
        <div className="container">
            <div className="back-wrapper">
                <button onClick={goBackHandler} className={darkMode ? "back-btn element-dark" : "back-btn element-light"}>
                  <span className="back-arrow-wrapper">
                    <FontAwesomeIcon icon={["fas", "arrow-left"]} />
                  </span>
                  <span>Back</span>
                </button>
            </div>
            <main>
              <div className="flag-wrapper">
                <img src={country.flag} alt={`Flag of ${country.name}`} />
              </div>
              <section className="country-info-wrapper">
                <h2>{country.name}</h2>
                <div className="list-wrapper">
                  <ul>
                    {countryDataArr.map(data => (
                      <li key={data.id}>
                        <strong>{`${data.label}: `}</strong>
                        <span>{data.content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="neighbors-wrapper">
                  <strong>Border countries:</strong>
                  {getNeighbors().map(n => (
                    <button onClick={neighborLinkHandler} key={n} className={darkMode ? "neighbor-btn element-dark" : "neighbor-btn element-light"}>
                      {n}
                    </button>
                  ))}
                </div>
              </section>
            </main>
        </div>
    </div>
  );
}

export default CountryPage;