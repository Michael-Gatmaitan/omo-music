// @ts-nocheck
import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import "./scss/Sidebar.css";

const Sidebar = () => {
  const { showSidebar } = useContext(EventContext);

  const sidebarStyle = {
    opacity: showSidebar ? 1 : 0,
    pointerEvents: showSidebar ? "auto" : "none",
  };

  const sidebarIcons = {
    socMeds: [
      {
        iconName: "facebook",
        iconLink: "https://facebook.com/michael.gatmaitan29/"
      }, {
        iconName: "github",
        iconLink: "https://github.com/Michael-Gatmaitan"
      }, {
        iconName: "instagram",
        iconLink: "https://www.instagram.com/mchlgtmtn/"
      }
    ],
    toolsUsed: ["figma", "git", "vscode"],
  };

  const stopPropagation = e => e.stopPropagation();

  return (
    <div
      className='sidebar-container'
      onClick={stopPropagation}
      style={sidebarStyle}
    >
      <div className='sidebar'>

        <SidebarNav />

        <div className="omo-watermark">
          <div className="watermark-logo">
            <img src="./svg/omo-logo.svg" alt="" />
          </div>

          <div className="omo-info">
            <div className="omo-text">OMO Music</div>
            <div className="omo-developer">Michael Gatmaitan, 2021</div>
          </div>
        </div>

        <div className="profile-container">

          <div className="profile-picture-container">
            <div className="profile-picture">
              <img src="./svg/profile.png" alt="" />
            </div>

          </div>

          <div className="profile-info">
            <div className="profile-label">Designed &amp; Developed by</div>
            <div className="profile-name">Michael Gatmaitan</div>
          </div>

          <div className="icons-container">

            <div className="icons-section">
              {sidebarIcons.socMeds.map((icon, id) => (
                <a target="_blank" href={icon.iconLink}>
                  <div className="circle-icon" key={id}>
                    <img src={`./svg/sidebar-icons/${icon.iconName}.svg`} width="32" />
                  </div>
                </a>
              ))}
            </div>

            <div className="icon-container-header">
              Tools I Used
            </div>

            <div className="icons-section">
              {sidebarIcons.toolsUsed.map((icon, id) => (
                <div className="circle-icon" key={id}>
                  <img src={`./svg/sidebar-icons/${icon}.svg`} width="32" />
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const SidebarNav = () => {
  
  const { setShowSidebar } = useContext(EventContext);

  return (
    <div className="sidebar-nav">
      <div className="close-sidebar" onClick={ () => setShowSidebar(false) }>
        <img src="./svg/floating-icons/close.svg" alt="" />
      </div>

      <div className="sidebar-nav-omo-logo">
        <img src="./svg/omo-logo.svg" alt="" />
      </div>
    </div>
  )
}

export default Sidebar;
