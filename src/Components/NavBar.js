import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavBar({darkHandler, darkMode}) {
  return (
    <div className={darkMode ? "nav-bar nav-bar-dark" : "nav-bar nav-bar-light"}>
        <div className="container">
            <Link to="/" className="home-link">
                <span>Where in the world?</span>
            </Link>
            <button className="dark-mode-btn" onClick={darkHandler}>
                <span className="moon-icon-wrapper">
                    <FontAwesomeIcon icon={darkMode ? ["fas", "moon"] : ["far", "moon"]} />
                </span>
                <span>Dark Mode</span>
            </button>
        </div>
    </div>
  );
}

export default NavBar;