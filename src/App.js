import React from 'react';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import CountryPage from './Components/CountryPage';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

function App() {

  library.add(fab, far, fas);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  const [darkMode, setDarkMode] = useState(false);

  const darkModeToggleHandler = () => {
    setDarkMode(prev => !prev);
  }

  const getCountries = async () => {
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await response.json();
    setCountries(data);
  }

  return (
    <Router>
      <div className="App">
        <NavBar darkHandler={darkModeToggleHandler} darkMode={darkMode}/>
        <Switch>
          <Route exact path="/" render={() => <Home countries={countries} darkMode={darkMode}/>} />
          {countries.map(country => (
          <Route exact path={`/${country.name.replace(/\s|\(|\)/g, '')}`}
            render={routeProps => <CountryPage country={country} countries={countries} darkMode={darkMode}/>}
            key={country.name}
          />
        ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
