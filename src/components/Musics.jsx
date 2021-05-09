import { useState, useEffect } from 'react';
import { bodyData } from '../dataSource';
import MusicBlock from './MusicBlock';

import './scss/MusicBlock.css';

const Musics = () => {
  let [musicDataTable, setMusicDataTable] = useState([]);

  useEffect(() => {
    let dataTemp = [];
    bodyData.map(body => dataTemp.push(...body.musics));

    setMusicDataTable(dataTemp);

    // setInterval(() => console.clear(), 5000);
  }, []);
  
  return (
    <div className="music-route">
      {musicDataTable.map((data, i) => (
        <MusicBlock
          musicDataTable={musicDataTable}
          data={data}
          key={i}
        />
      ))}
    </div>
  );
}

export default Musics;