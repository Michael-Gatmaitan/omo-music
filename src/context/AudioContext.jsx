// @ts-nocheck
import { Component, createContext } from "react";
import { albumCovers } from "../dataSource.js";
export const AudioContext = createContext();

export default class AudioContextProvider extends Component {
  state = JSON.parse(localStorage.getItem("bodyState")) || {
    showBackArrow: false,
    currentPage: "Musics",

    activeMusicRawTitle: "",
    activeMusic: "",

    currentTime: 0,
    duration: 0,

    order: false,
    shuffle: true,

    playing: false,

    musicLoading: false,

    trackList: [],

    trackHistoryIndex: null,
    trackHistory: [],

    recentPlayed: [],

    favorites: [],

    yourPlaylists: [
      // {
      // 	playlistID: number,
      // 	playlistName: string,
      // 	musics: string[],
      // 	imageLink: string
      // },
    ],

    activeMusicInfo: {
      path: "",
      title: "",
      artistName: "",
    },

    // playlists
  };

  componentDidMount() {
    if (localStorage.getItem("bodyState") !== null) {
      let audioEl = document.getElementsByTagName("audio")[0];
      audioEl.pause();
      audioEl.load();
    }
  }

  // Setting all state to localstorage bc of state changes
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    let isOnlyCurrentTimeChanged =
      this.state.playing && this.state.currentTime !== nextState.currentTime;

    // If only time of music is changed, do nothing, else set all state to localStorage
    if (!isOnlyCurrentTimeChanged)
      localStorage.setItem("bodyState", JSON.stringify(this.state));
  }

  removeMusicInPlaylist = (objName, rawTitle) => {
    let yourPlaylists = [...this.state.yourPlaylists];
    let musicObjParent = yourPlaylists.filter(
      (e) => e.playlistName === objName
    )[0];
    let { musics } = musicObjParent;
    musics.splice(musics.indexOf(rawTitle), 1);

    this.setState({ yourPlaylists });

    console.log(rawTitle, " successfully removed from playlist.");
  };

  updatePlaylistMusics = (obj, rawTitle) => {
    let yourPlaylists = [...this.state.yourPlaylists];

    let index = yourPlaylists.indexOf(obj);
    let updateObj = yourPlaylists[index];

    if (updateObj.musics.includes(rawTitle)) {
      alert(`${rawTitle} is already in playlist ${updateObj.playlistName}`);
    } else {
      updateObj.musics.unshift(rawTitle);
      yourPlaylists[index] = updateObj;
      this.setState({ yourPlaylists });
    }
  };

  deleteYourPlaylists = (plObj) => {
    let yourPlaylists = [...this.state.yourPlaylists];

    yourPlaylists.splice(plObj, 1);
    this.setState({ yourPlaylists });
  };

  editYourPlaylists = (index, plObj) => {
    let yourPlaylists = [...this.state.yourPlaylists];
    yourPlaylists[index] = {
      playlistID: yourPlaylists[index].playlistID,
      ...plObj,
    };

    this.setState({ yourPlaylists });
  };

  createYourPlaylists = (plObj) => {
    let yourPlaylists = [...this.state.yourPlaylists];
    yourPlaylists.unshift(plObj);
    this.setState({ yourPlaylists });
  };

  updateFavorites = (item) => {
    let favorites = [...this.state.favorites];

    if (favorites.includes(item)) favorites.splice(favorites.indexOf(item), 1);
    else favorites.unshift(item);

    this.setState({ favorites });
  };

  triggerMusicLoading = (bool) => this.setState({ musicLoading: bool });

  triggerShowBackArrow = (bool) => this.setState({ showBackArrow: bool });

  setCurrentPage = (title) => this.setState({ currentPage: title });

  triggerPlaying = (bool) => this.setState({ playing: bool });

  prev = () => {
    let { trackHistoryIndex, trackHistory } = this.state;
    trackHistoryIndex -= 1;
    this.setState({ trackHistoryIndex });

    let stepBack = trackHistory[trackHistoryIndex];
    this.musicSelectedFromLoc(stepBack);
  };

  next = () => {
    if (this.state.trackList.length > 1) {
      this.musicSelectedFromLoc(this.handleMusicEnded());
    } else {
      let audEl = document.getElementsByTagName("audio")[0];
      this.setState({ currentTime: 0 });
      audEl.pause();
    }
  };

  // Functions compiled
  onMusicSelect = (data, dataTable) => {
    this.musicSelectedFromLoc(data);
    this.updateTrackList(dataTable);
    this.updateTrackHistory(data);
  };

  updateRecentPlayed = (newItem) => {
    let recentPlayed = [...this.state.recentPlayed];
    recentPlayed.unshift(newItem);
    this.setState({ recentPlayed });
  };

  updateTrackHistory = (track) => {
    let trackHistory = [...this.state.trackHistory];

    if (!(track === trackHistory[trackHistory.length - 1])) {
      // If track is already in history, it will be removed then
      // it'll be at the bottom to avoid history duplication.
      trackHistory = trackHistory.includes(track)
        ? trackHistory.filter((history) => history !== track)
        : trackHistory;

      // Removing first element when length
      // of trackList reaches 100
      if (trackHistory.length >= 100) trackHistory.shift();

      trackHistory.push(track);
      this.setState({ trackHistory });
    }

    this.updateRecentPlayed(track);

    let trackHistoryIndex = trackHistory.lastIndexOf(track);
    this.setState({ trackHistoryIndex });
  };

  updateTrackLoc = (loc) => this.setState({ trackLoc: loc });

  musicSelectedFromLoc = (mscName) => {
    const musicArtist = mscName.slice(0, mscName.indexOf(" - "));
    const customPath = musicArtist.replaceAll(" ", "-").toLowerCase();
    const music = `/music-data/${customPath}/${mscName}`;

    const musicInfo = {
      path: customPath,
      title: mscName.slice(mscName.indexOf(" - ") + 3, -4),
      artistName: musicArtist,
    };

    document.title = mscName.slice(0, -4);

    this.handleChangeMusic(mscName, music, musicInfo);
  };

  handleChangeMusic = (mscName, activeMusic, activeMusicInfo) => {
    this.setState({ activeMusicRawTitle: mscName });
    this.setState({ activeMusic });
    this.setState({ activeMusicInfo });
  };

  updateTrackList = (trackList) => this.setState({ trackList });

  updateCurrentTime = (currentTime) => this.setState({ currentTime });

  updateTotalDuration = (duration) => this.setState({ duration });

  handleMusicEnded = () => {
    // Next song state will be option here
    const { activeMusicRawTitle, trackList } = this.state;
    const { order, shuffle } = this.state;
    let { trackHistoryIndex, trackHistory } = this.state;

    let nextSong;

    const currentMusicIndex = trackList.lastIndexOf(activeMusicRawTitle);

    if (trackHistoryIndex === trackHistory.length - 1) {
      if (order) {
        nextSong =
          currentMusicIndex === trackList.length - 1
            ? trackList[0]
            : trackList[currentMusicIndex + 1];
      } else if (shuffle) {
        do nextSong = trackList[Math.floor(Math.random() * trackList.length)];
        while (trackList.indexOf(nextSong) === currentMusicIndex);
      }
    } else {
      trackHistoryIndex += 1;
      this.setState({ trackHistoryIndex });
      nextSong = trackHistory[trackHistoryIndex];
    }

    if (!(trackHistoryIndex !== trackHistory.length - 1)) {
      this.updateTrackHistory(nextSong);
    }
    return nextSong;
  };

  changeMusicEndState = () => {
    this.setState({ order: !this.state.order });
    this.setState({ shuffle: !this.state.shuffle });
  };

  // Music Blocks Option's Function
  addQueue = (music) => {
    let trackHistory = [...this.state.trackHistory];
    trackHistory.push(music);

    this.setState({ trackHistory });
  };

  // Check for albumCover of current music playing
  albumCoverChecker = (artistName, musicTitle) => {
    let data;
    try {
      data = albumCovers[artistName][musicTitle];
    } catch (err) {
      data = undefined;
    }

    console.log(data);

    return data;
  };

  render() {
    const events_states = {
      triggerPlaying: this.triggerPlaying,

      updateTotalDuration: this.updateTotalDuration,
      updateCurrentTime: this.updateCurrentTime,

      handleChangeMusic: this.handleChangeMusic,
      handleMusicEnded: this.handleMusicEnded,
      changeMusicEndState: this.changeMusicEndState,
      updateTrackLoc: this.updateTrackLoc,

      musicSelectedFromLoc: this.musicSelectedFromLoc,
      updateTrackList: this.updateTrackList,
      updateTrackHistory: this.updateTrackHistory,

      onMusicSelect: this.onMusicSelect,

      prev: this.prev,
      next: this.next,

      triggerShowBackArrow: this.triggerShowBackArrow,

      setCurrentPage: this.setCurrentPage,

      triggerMusicLoading: this.triggerMusicLoading,

      updateFavorites: this.updateFavorites,

      addQueue: this.addQueue,

      deleteYourPlaylists: this.deleteYourPlaylists,
      createYourPlaylists: this.createYourPlaylists,
      editYourPlaylists: this.editYourPlaylists,

      updatePlaylistMusics: this.updatePlaylistMusics,
      removeMusicInPlaylist: this.removeMusicInPlaylist,

      albumCoverChecker: this.albumCoverChecker,

      sliderSeeked: this.sliderSeeked,
    };

    return (
      <AudioContext.Provider
        value={{
          ...this.state,
          ...events_states,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}
