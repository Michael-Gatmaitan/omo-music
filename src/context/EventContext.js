import { Component, createContext } from 'react';

export const EventContext = createContext();

export default class EventContextProvider extends Component {

  state = {
    // States for 'FloatingTrackMobile.jsx'
    showMusicTrackMobile: false,

    // for 'FloatingTrackList.jsx'
    showTracklist: false,

    // States for 'MusicOptions.jsx'
      // On going :P
    showMusicOptions: false,
    showSelectPlaylist: false,
    musicOptionsData: {
      rawTitle: '',
      title: '',
      artist: ''
    },

    showCreatePlaylist: false,

    showPlaylistOptions: false,
    
    showEditPlaylist: false,
    showDeletePlaylist: false,

    playlistOptionsData: {
      playlistID: null,
      playlistName: "",
      imageLink: ""
    }
  }
  
  // Event Functions for 'MusicTrackMobile.jsx'
  setShowMusicTrackMobile = bool => this.setState({ showMusicTrackMobile: bool });

  // For 'FloatingTrackList.jsx'
  setShowTracklist = bool => this.setState({ showTracklist: bool });

  // For 'MusicOptions.jsx'
    // On Going :P
  setShowMusicOptions = bool => this.setState({ showMusicOptions: bool });
  setShowSelectPlaylist = bool => this.setState({ showSelectPlaylist: bool });

  // Overall function for 'MusicOptions.jsx'
  closeAllMusicOptions = () => {
    this.setState({ showMusicOptions: false });
    this.setState({ showSelectPlaylist: false });
  }
  
  setMusicOptionsData = (rawTitle, title, artist) => {
    let musicOptionsData = { rawTitle, title, artist };
    this.setState({ musicOptionsData });
  }

  setShowCreatePlaylist = bool => this.setState({ showCreatePlaylist: bool });
  
  setShowPlaylistOptions = bool => this.setState({ showPlaylistOptions: bool });
  setShowEditPlaylist = bool => this.setState({ showEditPlaylist: bool });
  setShowDeletePlaylist = bool => this.setState({ showDeletePlaylist: bool });

  closeAllPlaylistOptions = () => {
    this.setState({ showPlaylistOptions: false });
    this.setState({ showEditPlaylist: false });
    this.setState({ showDeletePlaylist: false });
  }

  setPlaylistOptionsData = (playlistID, playlistName, imageLink) => {
    let playlistOptionsData = { playlistID, playlistName, imageLink };
    this.setState({ playlistOptionsData });
  }

  render() {

    const events_states = {
      // 
      setShowMusicTrackMobile: this.setShowMusicTrackMobile,
      // 
      setShowTracklist: this.setShowTracklist,
      // 
      ...{
        setShowMusicOptions: this.setShowMusicOptions,
        setShowSelectPlaylist: this.setShowSelectPlaylist,
        closeAllMusicOptions: this.closeAllMusicOptions,
        setMusicOptionsData: this.setMusicOptionsData,
      },

      setShowCreatePlaylist: this.setShowCreatePlaylist,

      ...{
        setShowPlaylistOptions: this.setShowPlaylistOptions,
        
        setShowEditPlaylist: this.setShowEditPlaylist,
        setShowDeletePlaylist: this.setShowDeletePlaylist,

        setPlaylistOptionsData: this.setPlaylistOptionsData,
        closeAllPlaylistOptions: this.closeAllPlaylistOptions,
      }
    };

    return (
      <EventContext.Provider
				value={{ ...this.state, ...events_states }}
			>
				{this.props.children}
			</EventContext.Provider>
    )
  }
}