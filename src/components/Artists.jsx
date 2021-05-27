import React from 'react';
import './scss/Artists.css';
import ArtistBlock from './ArtistBlock';
import { bodyData } from '../dataSource';

const Artists = () => (
  <div className="artists-route">
    {bodyData.map(data => (
      <ArtistBlock data={data} key={data.artistID} />
    ))}
  </div>
)

export default Artists;
