document.addEventListener('DOMContentLoaded', function() {
    const startStreamBtn = document.getElementById('start-stream-btn');
    const stopStreamBtn = document.getElementById('stop-stream-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const streamStatusElement = document.getElementById('stream-status');
    const currentSongElement = document.getElementById('current-song');
    const listenersCountElement = document.getElementById('listeners-count');
    const currentTitleElement = document.getElementById('current-title');
    const currentDescriptionElement = document.getElementById('current-description');
    const streamMessageElement = document.getElementById('stream-message');

    // Function to fetch metadata from the Flask backend
  function fetchMetadata() {
    fetch('/api/metadata')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched metadata:', data);  // Debugging
            if (data.is_live) {
                streamStatusElement.textContent = 'Online';
                streamStatusElement.classList.add('online');
                streamMessageElement.textContent = 'Stream is live!';
                currentSongElement.textContent = data.current_song;
                listenersCountElement.textContent = data.listeners || '0';
                console.log('Updated current song:', data.current_song);  // Debugging
            } else {
                streamStatusElement.textContent = 'Offline';
                streamStatusElement.classList.remove('online');
                streamMessageElement.textContent = 'Waiting for stream...';
                currentSongElement.textContent = 'None';
                listenersCountElement.textContent = '0';
            }
        })
        .catch(error => {
            console.error('Error fetching metadata:', error);
        });
}

    // Function to fetch saved settings
    function fetchSettings() {
        fetch('/api/get-settings')
        .then(response => response.json())
        .then(data => {
                currentTitleElement.textContent = data.title || 'None';
                currentDescriptionElement.textContent = data.description || 'None';
        })
        .catch(error => {
                console.error('Error fetching settings:', error);
        });
    }

    // Fetch metadata every 2 seconds
    setInterval(fetchMetadata, 2000);

    // Fetch settings on page load
    fetchSettings();

    // Initial fetch
    fetchMetadata();

    // Save settings button click handler
    saveSettingsBtn.addEventListener('click', function() {
        const streamTitle = document.getElementById('stream-title').value;
        const streamDescription = document.getElementById('stream-description').value;
        
        fetch('/api/save-settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: streamTitle,
                description: streamDescription,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchSettings();
        })
        .catch(error => {
            console.error('Error saving settings:', error);
        });
    });

    // Start stream button click handler
    startStreamBtn.addEventListener('click', function() {
        fetch('/api/start-stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchMetadata();
        })
        .catch(error => {
            console.error('Error starting stream:', error);
    });
});

    // Stop stream button click handler
    stopStreamBtn.addEventListener('click', function() {
        fetch('/api/stop-stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchMetadata();
        })
        .catch(error => {
            console.error('Error stopping stream:', error);
        });
    });

    // Logout button click handler
    logoutBtn.addEventListener('click', function() {
        window.location.href = '/logout';
    });
});

