import { Component, createContext } from 'react';

export const AudioContext = createContext();

export default class AudioContextProvider extends Component {
	
	state = JSON.parse(localStorage.getItem("bodyState")) || {
		showBackArrow: false,
		currentPage: 'Musics',

		activeMusicRawTitle: '',
		activeMusic: '',

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
			// 	playlistID: 0,
			// 	playlistName: "Working",
			// 	musics: [
			// 		"Avril Lavigne - Complicated.mp3"
			// 	],
			// 	imageLink: "https://aileen-molina-18.netlify.app/static/media/block4.009849d3.jpg"
			// },
			// {
			// 	playlistID: 1,
			// 	playlistName: "Coding vibes",
			// 	musics: [
			// 		"Coldplay - Paradise.mp3",
			// 		"Avicii - Fades Away.mp3"
			// 	],
			// 	imageLink: "https://aileen-molina-18.netlify.app/static/media/block2.add0064c.jpeg"
				
			// }
		],

		activeMusicInfo: {
			path: '',
			title: '',
			artistName: ''
		},

		// playlists
	};

	componentDidMount() {
		if (localStorage.getItem("bodyState") !== null) {
			let audioEl = document.getElementsByTagName("audio")[0];
			audioEl.load();
		}
	}

	componentDidUpdate() {
		localStorage.setItem("bodyState", JSON.stringify(this.state));
	}

	updatePlaylistMusics = (obj, rawTitle) => {
		let yourPlaylistsTemp = [...this.state.yourPlaylists];

		let index = yourPlaylistsTemp.indexOf(obj);
		let updateObj = yourPlaylistsTemp[index];

		if (updateObj.musics.includes(rawTitle)) {
			alert(`${rawTitle} is already in playlist ${updateObj.playlistName}`);
		} else {
			updateObj.musics.push(rawTitle);
			yourPlaylistsTemp[index] = updateObj;
			this.setState({ yourPlaylists: yourPlaylistsTemp });
		}
	}

	updateYourPlaylists = obj => {
		let yourPlaylistsTemp = [...this.state.yourPlaylists];
		yourPlaylistsTemp.push(obj);
		this.setState({ yourPlaylists: yourPlaylistsTemp });
	}

	addMusicInPlaylist = music => {
		
	}

	updateFavorites = item => {
		let favoritesTemp = [...this.state.favorites];

		if (favoritesTemp.includes(item)) {
			favoritesTemp.splice(favoritesTemp.indexOf(item), 1);
		} else {
			favoritesTemp.unshift(item);
		}

		// Callback used for debugging purpose only
		this.setState({ favorites: favoritesTemp }, () => {
			console.log(this.state.favorites);
		});
	}

	triggerMusicLoading = bool => this.setState({ musicLoading: bool });

	triggerShowBackArrow = bool => this.setState({ showBackArrow: bool });

	setCurrentPage = title => this.setState({ currentPage: title });

	triggerPlaying = bool => this.setState({ playing: bool });

	prev = () => {
		let { trackHistoryIndex, trackHistory } = this.state;
		trackHistoryIndex -= 1;
		this.setState({ trackHistoryIndex });

		let stepBack = trackHistory[trackHistoryIndex];
		this.musicSelectedFromLoc(stepBack);
	}
	
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
	functionsToFire = (data, dataTable) => {
		this.musicSelectedFromLoc(data);
		this.updateTrackList(dataTable);
		this.updateTrackHistory(data);
	}

	updateRecentPlayed = newItem => {
		let recentPlayed = [...this.state.recentPlayed];
		recentPlayed.unshift(newItem);
		this.setState({ recentPlayed });
	}

	updateTrackHistory = track => {
		let trackHistory = [...this.state.trackHistory];
		
		if (!(track === trackHistory[trackHistory.length - 1])) {

			// Moving played song to the bottom if
			// it exist on trackHistory
			trackHistory = trackHistory.includes(track)
			? trackHistory.filter(history => history !== track)
			: trackHistory;

			// Removing first element when length
			// of trackList reaches 100
			if (trackHistory.length >= 100)
				trackHistory.shift();
			
			trackHistory.push(track);
			this.setState({ trackHistory });
		}

		this.updateRecentPlayed(track);
		
		let trackHistoryIndex = trackHistory.lastIndexOf(track);
		this.setState({ trackHistoryIndex });
	}

	updateTrackLoc = loc => this.setState({ trackLoc: loc });

	musicSelectedFromLoc = mscName => {
		const musicArtist = mscName.slice(0, mscName.indexOf(" - "));
		const customPath = musicArtist.replaceAll(" ", "-").toLowerCase();
		const music = `../music-data/${customPath}/${mscName}`;

		const musicInfo = {
			path: customPath,
			title: mscName.slice(mscName.indexOf(" - ") + 3, -4),
			artistName: musicArtist
		}

		document.title = mscName.slice(0, -4);

		this.handleChangeMusic(mscName, music, musicInfo);
	}
	
	handleChangeMusic = (mscName, activeMusic, activeMusicInfo) => {
		this.setState({ activeMusicRawTitle: mscName });
		this.setState({ activeMusic });
		this.setState({ activeMusicInfo });
	}

	updateTrackList = trackList => this.setState({ trackList });

	updateCurrentTime = currentTime => this.setState({ currentTime });
	
	updateTotalDuration = duration => this.setState({ duration });

	handleMusicEnded = () => {
		// Next song state will be option here
		const { activeMusicRawTitle, trackList } = this.state;
		const { order, shuffle } = this.state;
		let { trackHistoryIndex, trackHistory } = this.state;

		let nextSong;
		
		const currentMusicIndex = trackList.lastIndexOf(activeMusicRawTitle);

		if (trackHistoryIndex === trackHistory.length - 1) {
			if (order) {
				nextSong = currentMusicIndex === trackList.length - 1 ?
				trackList[0] : trackList[currentMusicIndex + 1];
			} else if (shuffle) {
				do {
					nextSong = trackList[Math.floor(Math.random() * trackList.length)];
				} while (trackList.indexOf(nextSong) === currentMusicIndex);
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
	}
 
	changeMusicEndState = () => {
		this.setState({ order: !this.state.order });
		this.setState({ shuffle: !this.state.shuffle });
	}

	// Music Blocks Option's Function
	addQueue = music => {
		let trackHistoryTemp = [...this.state.trackHistory];
		trackHistoryTemp.push(music);
		
		this.setState({ trackHistory: trackHistoryTemp });
	}

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

			functionsToFire: this.functionsToFire,

			prev: this.prev,
			next: this.next,
			
			triggerShowBackArrow: this.triggerShowBackArrow,

			setCurrentPage: this.setCurrentPage,

			triggerMusicLoading: this.triggerMusicLoading,

			updateFavorites: this.updateFavorites,

			addQueue: this.addQueue,

			updateYourPlaylists: this.updateYourPlaylists,
			updatePlaylistMusics: this.updatePlaylistMusics
		};

		return (
			<AudioContext.Provider
				value={
					{
						...this.state,
						...events_states
					}
				}
			>
				{this.props.children}
			</AudioContext.Provider>
		)
	}
}