import React, { Component } from "react";
import axios from "axios";

// CREATE Context Instance to use
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results"
      };
    default:
      return state;
  }
};

// RENAMED  to Provider + NOT default export, because we also export a Consumer
export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 Tracks",
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {/* Global Acces to ALL children of provider */}
        {this.props.children}
      </Context.Provider>
    );
  }
}

// to import Global State later as {Consumer}
export const Consumer = Context.Consumer;
