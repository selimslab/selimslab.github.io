from flask import Flask, render_template, request
from spotify.credentials import spotify_credentials
from spotify.top_tracks import SpotifyTopTracks

app = Flask(__name__)

spotify_top_tracks_service = SpotifyTopTracks(credentials=spotify_credentials)


@app.route("/")
def welcome():
    return render_template("base.html")


@app.route("/", methods=["POST"])
def search_track():
    query = request.form["search"]
    if not query:
        return render_template("base.html")
    try:
        top_tracks = spotify_top_tracks_service.get_top_tracks_of_a_random_artist_from_a_genre(
            str(query)
        )
        return render_template("base.html", top_tracks=top_tracks, query=query)

    except (IndexError, KeyError) as e:
        return render_template("base.html", message=str(e), query=query)


if __name__ == "__main__":
    app.run(debug=True)
