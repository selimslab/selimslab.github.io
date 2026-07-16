interface Track {
    id: string;
    title: string;
    genre: string;
}

type MusicData = Record<string, { id: string; title: string }[]>;

document.addEventListener('DOMContentLoaded', function () {

    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    const nowPlaying = document.getElementById('now-playing') as HTMLElement;
    const playlist = document.getElementById('playlist') as HTMLElement;

    const allTracks: Track[] = [];
    let currentTrackIndex = -1;
    let shuffleIndex = -1;
    let shuffleMode = false;
    let shuffledIds: string[] = [];

    fetch('/assets/data/tracks.json')
        .then(response => response.json())
        .then(buildMusicLibrary)
        .catch(error => console.error('Error loading track list:', error));

    function buildMusicLibrary(musicData: MusicData): void {
        organizeTracksByGenre(musicData);
        shuffledIds = allTracks.map(track => track.id);
        fisherYatesShuffle(shuffledIds);
        clearMediaSession();
        updateMediaSessionMetadata(null);
        audioPlayer.addEventListener('ended', playNextTrack);

        const shuffleButton = document.getElementById('shuffle-button') as HTMLButtonElement;
        shuffleButton.addEventListener('click', function () {
            shuffleMode = !shuffleMode;
            this.classList.toggle('active', shuffleMode);
            if (shuffleMode && !audioPlayer.src) {
                playNextTrack();
            }
            if (!shuffleMode) {
                // continue from where it's left
                currentTrackIndex = allTracks.findIndex(t => t.id === shuffledIds[shuffleIndex]);
            }
        });
    }

    function organizeTracksByGenre(musicData: MusicData): void {
        Object.entries(musicData).forEach(([genre, tracks]) => {
            const genreSection = createGenreSection(genre);
            const trackList = createGenreTrackList(genre, tracks);

            genreSection.appendChild(trackList);
            playlist.appendChild(genreSection);
        });
    }

    function createGenreSection(genre: string): HTMLDetailsElement {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = genre;
        details.appendChild(summary);
        return details;
    }

    function createGenreTrackList(genre: string, tracks: { id: string; title: string }[]): HTMLUListElement {
        const trackList = document.createElement('ul');

        tracks.forEach(t => {
            const track: Track = { ...t, genre };
            allTracks.push(track);
            const trackElement = createTrackListItem(track);
            trackList.appendChild(trackElement);
        });

        return trackList;
    }

    function createTrackListItem(track: Track): HTMLLIElement {
        const trackElement = document.createElement('li');
        trackElement.classList.add('track');
        trackElement.textContent = track.title;
        trackElement.dataset.id = track.id;

        trackElement.addEventListener('click', function () {
            currentTrackIndex = allTracks.findIndex(t => t.id === track.id);
            play(track.id);
        });

        return trackElement;
    }

    function play(trackId: string): void {
        const track = allTracks.find(t => t.id === trackId);
        if (!track) return;
        nowPlaying.textContent = track.title;

        document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
        document.querySelector(`.track[data-id="${track.id}"]`)?.classList.add('active');

        const trackPath = `/assets/static/music/${track.genre}/${track.title}.mp3`;
        audioPlayer.src = trackPath;
        audioPlayer.play()
            .then(_ => updateMediaSessionMetadata(track))
            .catch(err => console.error(err));
    }

    const fisherYatesShuffle = (array: string[]): void => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    function playNextTrack(): void {
        if (allTracks.length === 0) return;

        if (shuffleMode) {
            shuffleIndex = (shuffleIndex + 1) % allTracks.length;
            play(shuffledIds[shuffleIndex]);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % allTracks.length;
            play(allTracks[currentTrackIndex].id);
        }
    }

    function playPreviousTrack(): void {
        if (allTracks.length === 0) return;

        if (shuffleMode) {
            shuffleIndex = (shuffleIndex - 1 + allTracks.length) % allTracks.length;
            play(shuffledIds[shuffleIndex]);
        } else {
            currentTrackIndex = (currentTrackIndex - 1 + allTracks.length) % allTracks.length;
            play(allTracks[currentTrackIndex].id);
        }
    }

    function clearMediaSession(): void {
        if (!('mediaSession' in navigator)) return;
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
        navigator.mediaSession.setActionHandler('seekto', null);
        navigator.mediaSession.metadata = null;
    }

    function setupMediaSession(): void {
        if (!('mediaSession' in navigator)) return;
        navigator.mediaSession.setActionHandler('previoustrack', playPreviousTrack);
        navigator.mediaSession.setActionHandler('nexttrack', playNextTrack);
        navigator.mediaSession.setActionHandler('seekto', function (details) {
            if (details.seekTime !== undefined && details.seekTime !== null) {
                audioPlayer.currentTime = details.seekTime;
            }
        });
    }

    function updateMediaSessionMetadata(track: Track | null): void {
        if (!('mediaSession' in navigator)) return;

        const artworkUrl = window.location.origin + `/assets/static/site/primes.png`;
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track?.title || '',
            artist: '',
            album: '',
            artwork: [{
                src: artworkUrl,
                sizes: '512x512',
                type: 'image/png'
            }]
        });
        setupMediaSession();
    }
});
