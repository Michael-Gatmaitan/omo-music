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
			// 	playlistID: number,
			// 	playlistName: string,
			// 	musics: string[],
			// 	imageLink: string
			// },
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
			audioEl.pause();
			audioEl.load();
		}
	}

	componentWillUpdate(nextProps, nextState) {
		let isOnlyCurrentTimeChanged = this.state.playing && this.state.currentTime !== nextState.currentTime;
		if (isOnlyCurrentTimeChanged) {
			// Only seconds changed
		} else {
			// Something changed
			localStorage.setItem("bodyState", JSON.stringify(this.state));
		}
	}

	removeMusicInPlaylist = (objName, rawTitle) => {		
		let yourPlaylistsTemp = [...this.state.yourPlaylists];
		let musicObjParent = yourPlaylistsTemp.filter(e => e.playlistName === objName)[0];
		let { musics } = musicObjParent;
		musics.splice(musics.indexOf(rawTitle), 1);

		this.setState({ yourPlaylists: yourPlaylistsTemp });
	}

	updatePlaylistMusics = (obj, rawTitle) => {
		let yourPlaylistsTemp = [...this.state.yourPlaylists];

		let index = yourPlaylistsTemp.indexOf(obj);
		let updateObj = yourPlaylistsTemp[index];

		if (updateObj.musics.includes(rawTitle)) {
			alert(`${rawTitle} is already in playlist ${updateObj.playlistName}`);
		} else {
			updateObj.musics.unshift(rawTitle);
			yourPlaylistsTemp[index] = updateObj;
			this.setState({ yourPlaylists: yourPlaylistsTemp });
		}
	}

	deleteYourPlaylists = plObj => {
		let yourPlaylistsTemp = [...this.state.yourPlaylists];

		yourPlaylistsTemp.splice(plObj, 1);
		this.setState({ yourPlaylists: yourPlaylistsTemp });
	}

	editYourPlaylists = (index, plObj) => {
		let yourPlaylistsTemp = [...this.state.yourPlaylists];
		yourPlaylistsTemp[index] = {
			playlistID: yourPlaylistsTemp[index].playlistID,
			...plObj
		};

		this.setState({ yourPlaylists: yourPlaylistsTemp });
	}
	
	createYourPlaylists = plObj => {
		let yourPlaylistsTemp = [...this.state.yourPlaylists];
		yourPlaylistsTemp.unshift(plObj);
		this.setState({ yourPlaylists: yourPlaylistsTemp });
	}

	updateFavorites = item => {
		let favoritesTemp = [...this.state.favorites];

		if (favoritesTemp.includes(item)) {
			favoritesTemp.splice(favoritesTemp.indexOf(item), 1);
		} else {
			favoritesTemp.unshift(item);
		}
		this.setState({ favorites: favoritesTemp });
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

			// If track is already in history, it will be removed then
			// it'll be at the bottom to avoid history duplication.
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

			deleteYourPlaylists: this.deleteYourPlaylists,
			createYourPlaylists: this.createYourPlaylists,
			editYourPlaylists: this.editYourPlaylists,

			updatePlaylistMusics: this.updatePlaylistMusics,
			removeMusicInPlaylist: this.removeMusicInPlaylist
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