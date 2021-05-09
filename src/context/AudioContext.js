import React, { Component, createContext } from 'react';

export const AudioContext = createContext();

class AudioContextProvider extends Component {
	
	state = JSON.parse(localStorage.getItem("bodyState")) || {
		showBackArrow: false,
		currentPage: '',

		activeMusicRawTitle: '',
		activeMusic: '',

		currentTime: 0,
		duration: 0,
		currentDurPercent: 0,
		
		order: false,
		shuffle: true,

		playing: false,

		trackList: [],

		trackHistoryIndex: null,
		trackHistory: [],

		recentPlayed: [],

		favorites: [],


		activeMusicInfo: {
			path: '',
			title: '',
			artistName: ''
		}
	}

	componentDidMount() {
		if (localStorage.getItem("bodyState") !== null) {
			let audioEl = document.getElementsByTagName("audio")[0];
			audioEl.load();
		}
	}

	componentDidUpdate() {
		localStorage.setItem("bodyState", JSON.stringify(this.state));
	}

	triggerShowBackArrow = bool => this.setState({ showBackArrow: bool });

	setCurrentPage = title => this.setState({ setCurrentPage: title });

	triggerPlaying = bool => this.setState({ playing: bool });

	prev = () => {
		let { trackHistoryIndex, trackHistory } = this.state;
		trackHistoryIndex -= 1;
		this.setState({ trackHistoryIndex });

		let stepBack = trackHistory[trackHistoryIndex];
		this.musicSelectedFromLoc(stepBack);
	}
	
	next = () => this.musicSelectedFromLoc(this.handleMusicEnded());

	// Functions compiled
	functionsToFire = (data, dataTable) => {
		this.musicSelectedFromLoc(data);
		this.updateTrackList(dataTable);
		this.updateTrackHistory(data);
	}

	// 

	updateTrackHistory = track => {
		let trackHistory = [...this.state.trackHistory];
		
		if (track === trackHistory[trackHistory.length - 1]) {

		} else {
			trackHistory = trackHistory.includes(track)
			? trackHistory.filter(history => history !== track)
			: trackHistory;

			if (trackHistory.length >= 100)
				trackHistory.shift();
			
			trackHistory.push(track);
			this.setState({ trackHistory });

			let recentPlayed = [];
			for (let i = trackHistory.length; i > 0; i -= 1)
				recentPlayed.push(trackHistory[i - 1]);

			this.setState({ recentPlayed });
		}
		
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

		this.handleChangeMusic(mscName, music, musicInfo);
	}
	
	handleChangeMusic = (mscName, activeMusic, activeMusicInfo) => {
		this.setState({ activeMusicRawTitle: mscName });
		this.setState({ activeMusic });
		this.setState({ activeMusicInfo });
	}

	updateTrackList = trackList => this.setState({ trackList });

	updateCurrentTime = currentTime => {
		this.setState({ currentDurPercent: (
			this.state.currentTime / this.state.duration) * 100
		});
		this.setState({ currentTime });
	}
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
			console.log(nextSong);
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

	render() {
		
		const events_states = {
			triggerPlaying: this.triggerPlaying,

			...{
				currentTime: this.state.currentTime,
				duration: this.state.duration,
				currentDurPercent: this.state.currentDurPercent,
			},

			...{
				updateTotalDuration: this.updateTotalDuration,
				updateCurrentTime: this.updateCurrentTime,
			},

			handleChangeMusic: this.handleChangeMusic,
			handleMusicEnded: this.handleMusicEnded,
			changeMusicEndState: this.changeMusicEndState,
			updateTrackLoc: this.updateTrackLoc,

			...{
				musicSelectedFromLoc: this.musicSelectedFromLoc,
				updateTrackList: this.updateTrackList,
				updateTrackHistory: this.updateTrackHistory,
			},

			functionsToFire: this.functionsToFire,

			...{
				trackHistory: this.state.trackHistory,
				trackHistoryIndex: this.state.trackHistoryIndex,
			},

			activeMusic: this.state.activeMusic,

			...{
				prev: this.prev,
				next: this.next,
			},

			...{
				order: this.state.order,
				shuffle: this.state.shuffle,
			},
			
			...{
				triggerShowBackArrow: this.triggerShowBackArrow,
				showBackArrow: this.state.showBackArrow
			}
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

export default AudioContextProvider;
