import React, { useState, useEffect, Suspense, lazy } from 'react';
import SuspenseFallback from './_suspenseFallback';
import { allMusics } from '../dataSource';
import './scss/MusicBlock.css';

const MusicBlock = lazy(() => import('./MusicBlock'));

const Musics = () => {
  let [musicDataTable, setMusicDataTable] = useState([]);

  useEffect(() => {
    // Collecting all of musics from every artist.
    // "allMusics" have a bundled all songs of artists
    console.log(`OMO Music has total of ${allMusics.length} songs.`);
    setMusicDataTable(allMusics);

    // artistID aligner *incase of new artists added*
    // let bDataTemp = [...allMusics];
    // bDataTemp.map((e, i) => e.artistID = i);

    // console.log(bDataTemp);
    
    // Displays Total song count
    // let totalSongs = 0;
    // for (var i of bDataTemp) {
    //   totalSongs += i["musics"].length;
    // }
  }, []);
  
  return (
    <div className="music-route route-parent">
      {musicDataTable.map((data, i) => (
        <Suspense fallback={<SuspenseFallback />} key={i}>
          <MusicBlock
            musicDataTable={musicDataTable}
            data={data}
            displayArtistImage={false}
          />
        </Suspense>
      ))}
    </div>
  );
}

export default Musics;