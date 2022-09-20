from flask import Flask, jsonify, render_template, request
from .spotify.credentials import spotify_top_tracks_service

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True


@app.route("/tracks/<genre>")
def get_top_tracks(genre):
    try:
        top_tracks = spotify_top_tracks_service.get_top_tracks_of_a_random_artist_from_a_genre(
            str(genre)
        )
        return jsonify(top_tracks)
    except (IndexError, KeyError) as e:
        return {"error": str(e)}


if __name__ == "__main__":
    app.run()
