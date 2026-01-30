---
- [x] Install Icecast on the local device.
- [ ] Configure the server:
  - Set the port (e.g., `8000`).
  - Define the source password (e.g., `hackme`).
  - Configure the streaming format (e.g., MP3, OGG).
- [ ] Test the server locally.

### 2. Configure BUTT
- [ ] Install BUTT on the broadcasting device.
- [ ] Set up a new streaming profile:
  - Server address: `localhost` (or local IP).
  - Port: `8000` (or the configured Icecast port).
  - Streaming format: MP3 or OGG.
  - Bitrate: Choose a suitable bitrate (e.g., 128 kbps).
- [ ] Select the audio input (e.g., microphone or virtual audio cable).
- [ ] Test the connection to the Icecast server.

### 3. Develop the Web Interface
- [ ] Create a simple web page using HTML/CSS/JavaScript.
- [ ] Use a backend framework (e.g., Python Flask) to:
  - Fetch metadata from the Icecast server.
  - Provide listener statistics.
- [ ] Embed an audio player (e.g., HTML5 `<audio>` tag) to stream directly in the browser.
- [ ] Add features:
  - Display if the broadcaster is live.
  - Show current song/artist metadata.
  - Allow listeners to tune in.

### 4. Test the Setup
- [ ] Start the Icecast server.
- [ ] Start BUTT and begin streaming.
- [ ] Use VLC or the web interface to listen to the stream.
- [ ] Verify that the web interface displays metadata correctly.

### 5. Deployment
- [ ] Expose the Icecast server to the internet (if needed) using port forwarding or a reverse proxy.
- [ ] Share the Icecast server URL with listeners.
- [ ] Ensure the web interface is accessible to listeners.

### 6. Optional Enhancements
- [ ] Add user authentication for the web interface.
- [ ] Implement a chat feature for listeners to interact.
- [ ] Add a schedule for live broadcasts.
- [ ] Integrate social media sharing.

---

## Tools and Technologies

- **Icecast**: Streaming server.
- **BUTT**: Broadcasting tool.
- **Python Flask**: Backend for the web interface.
- **HTML/CSS/JavaScript**: Frontend for the web interface.
- **VLC**: For testing the stream.

---

## Notes

- Ensure your internet connection can handle the streaming bandwidth.
- Test the setup locally before exposing it to the internet.
- Consider using a virtual audio cable for routing audio from other applications into BUTT.
