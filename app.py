from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

# Icecast server configuration
ICECAST_SERVER = "http://localhost:8000"

@app.route("/")
def index():
    """Render the main page."""
    return render_template("index.html")

@app.route("/api/metadata")
def get_metadata():
    """Fetch metadata from the Icecast server."""
    try:
        # Fetch the status JSON from Icecast
        response = requests.get(f"{ICECAST_SERVER}/status-json.xsl")
        data = response.json()
        
        # Extract relevant metadata
        metadata = {
            "is_live": False,
            "current_song": "Unknown Song",
            "listeners": 0,
        }
        
        # Check if the source is present
        if "icestats" in data and "source" in data["icestats"]:
            source = data["icestats"]["source"]
            if source:  # Check if source is not empty
                metadata["is_live"] = True
                metadata["current_song"] = source.get("title", "Unknown Song")
                metadata["listeners"] = source.get("listeners", 0)
        
        return jsonify(metadata)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
