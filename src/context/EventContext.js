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

    // Permissions to delete { "Playlists", "Musics in Playlists" }
    showPermissionToDeleteMusic: false,
    showEditPlaylist: false,
    showPermissionToDeletePlaylist: false,
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
  
  setMusicOptionsData = (data, title, artist) => {
    let musicOptionsData = {
      rawTitle: data,
      title: title,
      artist: artist
    };

    this.setState({ musicOptionsData });
  }

  setShowCreatePlaylist = bool => this.setState({ showCreatePlaylist: bool });

  setShowPlaylistOptions = bool => this.setState({ showPlaylistOptions: bool });

  // Permissions mainly in Playlists
  setShowPermissionToDeleteMusic = bool => this.state({ showPermissionToDeleteMusic: bool });
  setShowEditPlaylist = bool => this.state({ showEditPlaylist: bool });
  setShowPermissionToDeletePlaylist = bool => this.state({ showPermissionToDeletePlaylist: bool });

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

      setShowPlaylistOptions: this.setShowPlaylistOptions,

      setShowPermissionToDeleteMusic: this.setShowPermissionToDeleteMusic,
      setShowEditPlaylist: this.setShowEditPlaylist,
      setShowPermissionToDeletePlaylist: this.setShowPermissionToDeletePlaylist,
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