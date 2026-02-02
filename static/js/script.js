document.addEventListener('DOMContentLoaded', function() {
    const liveStatusElement = document.getElementById('live-status');
    const currentSongElement = document.getElementById('current-song');
    const audioSource = document.getElementById('audio-source');
    const listenersCountElement = document.getElementById('listeners-count');
    const audioPlayer = document.getElementById('audio-player');
    const playerMessage = document.getElementById('player-message');

     // Set the stream URL from environment variable
// Get the ICECAST_SERVER value from the global variable set by Flask
    const streamUrl = window.icecastServer || 'http://localhost:8000/stream';

    if (audioSource) {
        audioSource.src = streamUrl;
        audioPlayer.load(); // Reload the audio element with new source
    }

    // Function to fetch metadata from the Flask backend
    function fetchMetadata() {
        fetch('/api/metadata')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched metadata:', data); // Log the fetched data
                if (data.is_live) {
                    liveStatusElement.textContent = 'Online';
                    liveStatusElement.classList.add('online');
                    currentSongElement.textContent = data.current_song || 'Unknown Song';
                    listenersCountElement.textContent = data.listeners || '0';
                    audioPlayer.removeAttribute('disabled');
                    playerMessage.classList.remove('show');
                } else {
                    liveStatusElement.textContent = 'Offline';
                    liveStatusElement.classList.remove('online');
                    currentSongElement.textContent = 'None';
                    listenersCountElement.textContent = '0';
                    audioPlayer.setAttribute('disabled', 'true');
                    playerMessage.classList.add('show');
                }
            })
            .catch(error => {
                console.error('Error fetching metadata:', error);
            });
    }

    // Fetch metadata every 5 seconds
    setInterval(fetchMetadata, 5000);

    // Initial fetch
    fetchMetadata();
});
