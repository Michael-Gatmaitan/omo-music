import { useState, useEffect, Suspense, lazy } from 'react';
import { bodyData } from '../dataSource';
import './scss/MusicBlock.css';
// import MusicBlock from './MusicBlock';

const MusicBlock = lazy(() => import('./MusicBlock'));

const Musics = () => {
  let [musicDataTable, setMusicDataTable] = useState([]);

  useEffect(() => {
    let dataTemp = [];
    bodyData.map(body => dataTemp.push(...body.musics));

    setMusicDataTable(dataTemp);

    // artistID aligner
    let bDataTemp = [...bodyData];
    bDataTemp.map((e, i) => e.artistID = i);
    console.log(bDataTemp);

    let totalSongs = 0;
    for (var i of bDataTemp) {
      totalSongs += i["musics"].length;
    }

    console.log(totalSongs);
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