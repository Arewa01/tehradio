from flask import Flask, render_template, jsonify, request, redirect, url_for, session
import requests
import subprocess
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')  # Load secret key from .env

# Icecast server configuration
ICECAST_SERVER = os.getenv('ICECAST_SERVER')
ICECAST_SOURCE_PASSWORD = os.getenv('ICECAST_SOURCE_PASSWORD')

# Mock user credentials (replace with a proper authentication system)
USERS = {
    os.getenv('ADMIN_USERNAME'): os.getenv('ADMIN_PASSWORD')
}

# Global variable to store stream settings
STREAM_SETTINGS = {
    "title": "",
    "description": ""
}

@app.route("/")
def index():
    """Render the main page."""
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    """Render the dashboard page."""
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template("dashboard.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Handle login."""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if username in USERS and USERS[username] == password:
            session['username'] = username
            return redirect(url_for('dashboard'))
        return "Invalid credentials", 401
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <h1>Login</h1>
        <form method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Login</button>
        </form>
    </body>
    </html>
    """

@app.route("/logout")
def logout():
    """Handle logout."""
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route("/api/metadata")
def get_metadata():
    """Fetch metadata from the Icecast server and include saved settings."""
    try:
        # Fetch the status JSON from Icecast
        response = requests.get(f"{ICECAST_SERVER}/status-json.xsl")
        data = response.json()

        # Extract relevant metadata
        metadata = {
            "is_live": False,
            "current_song": STREAM_SETTINGS.get("title", "Unknown Song"),
            "listeners": 0,
        }

        # Check if the source is present and not empty
        if "icestats" in data and "source" in data["icestats"]:
            source = data["icestats"]["source"]
            if source and source != "null":
                metadata["is_live"] = True
                metadata["listeners"] = source.get("listeners", 0)

        return jsonify(metadata)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/get-settings")
def get_settings():
    """Get saved stream settings."""
    return jsonify(STREAM_SETTINGS)

@app.route("/api/save-settings", methods=["POST"])
def save_settings():
    """Save stream settings."""
    global STREAM_SETTINGS
    data = request.get_json()
    STREAM_SETTINGS["title"] = data.get("title", "")
    STREAM_SETTINGS["description"] = data.get("description", "")
    return jsonify({"message": "Settings saved successfully"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)



