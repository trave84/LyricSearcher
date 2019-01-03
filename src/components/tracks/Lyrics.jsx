// DIRECT CHILD of App.js (along with Index)

import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner.jsx";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Lyrics extends Component {
  // NO NEED for Global State in Context, ONLY need this data for THIS Component
  state = {
    tracks: {}, // Track Full Info
    lyrics: {} // Just the Lyrics Object
  };

  componentDidMount() {
    axios
      // track.lyrics Endpoint here:
      .get(
        // !!! CORS WORKAROUND !!!
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          // GET: Router param from URL here:
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        // FIRST SET Lyrics data {json} to {state.lyrics}
        this.setState({ lyrics: res.data.message.body.lyrics });

        // NOW: RETURN ANOTHER GET to get he Full Track Info
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })

      // SECOND SET: Track data {json} to {state.track}
      .then(res => {
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }

  // WE NOW GOT: the lyrics + the track full info
  render() {
    const { track, lyrics } = this.state;
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secodary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID: </strong> {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Song Genre: </strong>{" "}
              {
                track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name
              }
            </li>
            <li className="list-group-item">
              <strong>Explicit words: </strong>
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="list-grou-item">
              <strong>Released date: </strong>
              <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
