import { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { Link, useLocation } from 'react-router-dom';
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
        <SearchbarContent />
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

const SearchbarContent = () => {

  return (
    <div className="search-content">mama mo search</div>
  )
}

export default Nav;