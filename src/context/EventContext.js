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

  setMusicOptionsData = (data, title, artist) => {
    let musicOptionsData = {
      rawTitle: data,
      title: title,
      artist: artist
    };

    this.setState({ musicOptionsData });
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
      }
    };

    return (
      <EventContext.Provider
				value={
					{
						...this.state,
						...events_states
					}
				}
			>
				{this.props.children}
			</EventContext.Provider>
    )
  }
}