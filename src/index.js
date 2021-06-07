import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import LandingPage from './LandingPage';

import { BrowserRouter as Router } from 'react-router-dom';
// Contexts
import AudioContextProvider from './context/AudioContext';
import EventContextProvider from './context/EventContext';

ReactDOM.render(
  <Router>
    <AudioContextProvider>
      {/* {localStorage.length === 0 ? <LandingPage /> : <App />} */}
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </AudioContextProvider>
  </Router>,
  document.getElementById('root')
);

// music-data\ali-gatie
// music-data\ariana-grande
// music-data\avicii
// music-data\avril-lavigne
// music-data\bazzi
// music-data\ben&ben
// music-data\billie-eilish
// music-data\blink-182
// music-data\coldplay
// music-data\creed
// music-data\disturbed
// music-data\ed-sheeran
// music-data\evanescence
// music-data\five-for-fighting
// music-data\fm-static
// music-data\green-day
// music-data\hinder
// music-data\hoobastank
// music-data\imaginedragons
// music-data\joji
// music-data\juice-wrld
// music-data\justine-timberlake
// music-data\khalid
// music-data\lady-gaga
// music-data\lany
// music-data\lauv
// music-data\maroon-5
// music-data\marshmello
// music-data\mike-posner
// music-data\miley-cyrus
// music-data\my-chemical-romance
// music-data\oh-wonder
// music-data\one-direction
// music-data\onerepublic
// music-data\owl-city
// music-data\paramore
// music-data\planetshakers
// music-data\post-malone
// music-data\powfu
// music-data\taylor-swift
// music-data\the-chainsmokers
// music-data\the-script
// music-data\the-weeknd
// music-data\twenty-one-pilots
// music-data\we-the-kings
// music-data\zedd