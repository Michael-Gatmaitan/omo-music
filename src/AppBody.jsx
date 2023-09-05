import { useContext, useMemo, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AudioContext } from "./context/AudioContext";

const AppBody = () => {
  let { showBackArrow, currentPage, setCurrentPage } = useContext(AudioContext);

  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  let routes = useMemo(
    () => [
      { routeName: "Musics", url: "/", id: 0 },
      { routeName: "Playlists", url: "/playlists", id: 1 },
      { routeName: "Artists", url: "/artists", id: 2 },
      // { routeName: 'Search', url: '/search', id: 3 },
    ],
    []
  );

  useEffect(() => {
    let slashCount = 0;
    pathname.split("").forEach((char) => (slashCount += char === "/" ? 1 : 0));
    if (pathname === "/search" || slashCount >= 2) {
      return;
    }

    let validPathname = false;

    for (let i = 0; i < routes.length; i++) {
      validPathname = routes[i].url === pathname;
      if (validPathname) break;
    }

    if (!validPathname) {
      console.log("Pathname not found, error code 404.");
      return;
    }

    setCurrentPage(pathname);

    let routeButtons = [...document.getElementsByClassName("route-button")];
    let actvBtn = routes.filter((e) => e.url === pathname)[0].id;

    routeButtons.map((e, i) =>
      actvBtn === i
        ? e.classList.add("active-route")
        : e.classList.remove("active-route")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className='app-body'>
      <div className='location-title'>
        <div
          className='back-arrow'
          onClick={() => history.goBack()}
          style={{
            opacity: showBackArrow ? 1 : 0,
            pointerEvents: showBackArrow ? "auto" : "none",
          }}
        >
          <img src={`/svg/back-arrow.svg`} alt='back-arrow' />
        </div>

        <span style={{ marginLeft: showBackArrow ? "46px" : "0px" }}>
          {currentPage}
        </span>
      </div>
      <ul className='route-links'>
        {routes.map((e) => (
          <Link key={e.id} to={e.url} className={`route-button`}>
            <li>{e.routeName}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AppBody;
