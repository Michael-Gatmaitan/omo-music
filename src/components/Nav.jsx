import { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import './scss/Nav.css';

const { PUBLIC_URL } = process.env;

const Nav = () => {

  const {
    // eslint-disable-next-line no-unused-vars
    showSidebar,
    setShowSidebar
  } = useContext(EventContext);

  return (
    <div className="nav">

      <div className="menu-block-container" onClick={ () => setShowSidebar(true) }>
        <img src={`${PUBLIC_URL}/svg/burger-menu.svg`} alt="burger-menu" />
      </div>

      <div className="nav-logo-container">
        <img src={`${PUBLIC_URL}/svg/omo-logo.svg`} alt="omo-logo" />
        <div className="logo-label">OMO Music</div>
      </div>
    </div>
  )
}

export default Nav;