import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { Link } from "react-router-dom";
import "./scss/Sidebar.css";

const sidebarButtons = [
  { text: "My Portfolio", path: "/", id: 1 },
  { text: "About OMO Music", path: "/about", id: 2 },
  { text: "Contact Developer", path: "/contact", id: 3 },
  {
    text: "Github repo",
    path: "https://www.github.com/Michael-Gatmaitan/omo-music",
    id: 4,
  },
];

const sidebarIcons = {
  socMeds: [
    {
      iconName: "facebook",
      iconLink: "https://facebook.com/michael.gatmaitan29/",
    },
    {
      iconName: "github",
      iconLink: "https://github.com/Michael-Gatmaitan",
    },
    {
      iconName: "instagram",
      iconLink: "https://www.instagram.com/mchlgtmtn/",
    },
  ],
  toolsUsed: ["figma", "git", "vscode"],
};

// const activeListeners = [
//   { imageSrc: `/listeners-image/listener_1.jpg`, name: "Jasmine Sevilla" },
// ];

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useContext(EventContext);

  const sidebarStyle = {
    opacity: showSidebar ? 1 : 0,
    pointerEvents: showSidebar ? "auto" : "none",
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="sidebar-container"
      onClick={stopPropagation}
      style={sidebarStyle}
    >
      <div className="sidebar">
        <SidebarNav />

        <div className="omo-watermark">
          <div className="watermark-logo">
            <img src="/svg/omo-logo.svg" alt="omo-logo" />
          </div>

          <div className="omo-info">
            <div className="omo-text">OMO Music</div>
            <div className="omo-developer">Michael Gatmaitan, 2021</div>
          </div>
        </div>

        {/* Buttons */}

        <div className="sidebar-buttons">
          {sidebarButtons.map((button) => (
            <div className="button-container" key={button.id}>
              <Link to={button.path} onClick={() => setShowSidebar(false)}>
                <div className="button">{button.text}</div>
              </Link>
            </div>
          ))}
        </div>

        <div className="profile-container">
          <div className="profile-picture-container">
            <div className="profile-picture">
              <img src={`/svg/profile.png`} alt="" />
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-label">Designed &amp; Developed by</div>
            <div className="profile-name">Michael Gatmaitan</div>
          </div>

          <div className="icons-container">
            <div className="icons-section">
              {sidebarIcons.socMeds.map((icon, id) => (
                <a
                  target="_blank"
                  href={icon.iconLink}
                  rel="noreferrer"
                  key={id}
                >
                  <div className="circle-icon">
                    <img
                      src={`/svg/sidebar-icons/${icon.iconName}.svg`}
                      width="32"
                      alt="profile_icons"
                    />
                  </div>
                </a>
              ))}
            </div>

            <div className="icon-container-header">Tools I Used</div>

            <div className="icons-section">
              {sidebarIcons.toolsUsed.map((icon, id) => (
                <div className="circle-icon" key={id}>
                  <img
                    src={`/svg/sidebar-icons/${icon}.svg`}
                    width="32"
                    alt="icons"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LISTENERS */}

        {/* <div className="active-listener"> */}
        {/**/}
        {/*   <div className="active-listener-header"> Active Listeners</div> */}
        {/**/}
        {/*   <div className="listener-card-container"> */}
        {/*     {activeListeners.map((listener, i) => ( */}
        {/*       <ActiveListenerCard listener={listener} key={i} /> */}
        {/*     ))} */}
        {/*   </div> */}
        {/**/}
        {/* </div> */}
      </div>
    </div>
  );
};

// const ActiveListenerCard = ({ listener }) => {
//   const { imageSrc, name } = listener;
//
//   return (
//     <div className="listener-card">
//       <div className="listener-image">
//         <img src={imageSrc} alt="listener" />
//       </div>
//       <div className="listener-name">{name}</div>
//     </div>
//   );
// };

const SidebarNav = () => {
  const { setShowSidebar } = useContext(EventContext);

  return (
    <div className="sidebar-nav">
      <div className="close-sidebar" onClick={() => setShowSidebar(false)}>
        <img src={`/svg/floating-icons/close.svg`} alt="" />
      </div>

      <div className="sidebar-nav-omo-logo">
        <img src={`/svg/omo-logo.svg`} alt="omo-logo" />
      </div>
    </div>
  );
};

export default Sidebar;
