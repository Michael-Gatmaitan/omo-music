
import './scss/Nav.css';

const Nav = () => {

  return (
    <div className="nav">

      <div className="menu-block-container">
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