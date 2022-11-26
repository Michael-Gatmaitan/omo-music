import React, { useState, useEffect, Suspense, lazy } from 'react';
import { bodyData } from '../dataSource';
import './scss/MusicBlock.css';

const MusicBlock = lazy(() => import('./MusicBlock'));

const Musics = () => {
  let [musicDataTable, setMusicDataTable] = useState([]);

  useEffect(() => {
    let dataTemp = [];

    // Collecting all of musics from every artist.
    bodyData.map(body => dataTemp.push(...body.musics));

    setMusicDataTable(dataTemp);

    // artistID aligner *incase of new artists added*
    let bDataTemp = [...bodyData];
    bDataTemp.map((e, i) => e.artistID = i);
    console.log(bDataTemp);

    // let totalSongs = 0;
    // for (var i of bDataTemp) {
    //   totalSongs += i["musics"].length;
    // }

    // Displays Total song count
    // console.log(totalSongs);
    console.log(dataTemp);
  }, []);
  
  return (
    <div className="music-route">
      {musicDataTable.map((data, i) => (
        <Suspense fallback={<div></div>} key={i}>
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