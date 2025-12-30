import React from "react";
import "../../scss/Artists.css";
import ArtistBlock from "./ArtistBlock";
import { bodyData } from "../../../dataSource";
import { Route, Routes } from "react-router-dom";
import ArtistTrack from "./artistTrack/ArtistTrack";

const Artists = () => (
  <div className="artists-route route-parent">
    {/* <Routes>
      <Route path=":artistID" element={<ArtistTrack />} />
    </Routes> */}

    {bodyData.map((data, i) => (
      // <ArtistBlock data={data} key={data.artistID} />
      <ArtistBlock data={data} key={i} />
    ))}
  </div>
);

export default Artists;
