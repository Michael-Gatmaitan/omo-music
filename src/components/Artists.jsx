import React from 'react';
import './scss/Artists.css';
import ArtistBlock from './ArtistBlock';
import { bodyData } from '../dataSource';

const Artists = () => (
  <div className="artists-route route-parent">
    {bodyData.map((data, i) => (
      // <ArtistBlock data={data} key={data.artistID} />
      <ArtistBlock data={data} key={i} />
    ))}
  </div>
)

export default Artists;
