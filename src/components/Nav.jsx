import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { SearchContext } from '../context/SearchContext';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './scss/navs/Nav.css';
import './scss/navs/SearchNav.css';


const { PUBLIC_URL } = process.env;

const Nav = () => {

  const {
    setShowSidebar
  } = useContext(EventContext);

  const { pathname } = useLocation();

  const navMode = pathname !== "/search";

  return (
    <div className={`${navMode ? "nav" : "search-nav"}`}>
      {
      pathname !== "/search" ?
        <NavContent setShowSidebar={setShowSidebar} />
      :
        <SearchNavContent />
      }
    </div>
  )
}

const NavContent = ({ setShowSidebar }) => (
  <>
    <div className="menu-block-container" onClick={ () => setShowSidebar(true) }>
      <img src={`${PUBLIC_URL}/svg/burger-menu.svg`} alt="burger-menu" />
    </div>

    <div className="nav-logo-container">
      <img src={`${PUBLIC_URL}/svg/omo-logo.svg`} alt="omo-logo" />
      <div className="logo-label">OMO Music</div>
    </div>

    <div className="search-container">
      <Link to="/search">
        <div className="search"></div>      
      </Link>
    </div>
  </>
);

const SearchNavContent = () => {

  const {
    performSearch
  } = useContext(SearchContext);

  const history = useHistory();

  return (
    <React.Fragment>
      <Link to="/">
        <div className="nav-back-arrow" onClick={() => history.goBack()}>
          <img src={`${PUBLIC_URL}/svg/back-arrow.svg`} alt="back" />
        </div>
      </Link>
      <input
        type="text"
        className="search-input"
        placeholder="Search song or artist"
        onChange={ e => performSearch(e.target.value)}
      />
      <div className="close-search"></div>
    </React.Fragment>
  )
}

export default Nav;