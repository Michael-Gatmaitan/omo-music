import { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import './scss/Nav.css';

const Nav = () => {

  const {
    // eslint-disable-next-line no-unused-vars
    showSidebar,
    setShowSidebar
  } = useContext(EventContext);

  return (
    <div className="nav">

      <div className="menu-block-container" onClick={ () => setShowSidebar(true) }>
        <img src='../svg/burger-menu.svg' alt="burger-menu" />
      </div>

      <div className="nav-logo-container">
        <img src='../svg/omo-logo.svg' alt="omo-logo" />
        <div className="logo-label">OMO Music</div>
      </div>
    </div>
  )
}

export default Nav;