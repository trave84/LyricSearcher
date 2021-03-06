import React, { Component } from "react";
import { Consumer } from "../../context"; // BRING IN the Global State here
import Spinner from "../layout/Spinner.jsx";
import Track from "./Track.jsx";

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {/* value=this.state (global) in Consumer */}
        {value => {
          console.log("Global State: ", value);

          const { track_list, heading } = value;

          if (track_list === undefined || track_list === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <h3 className="row">{heading}</h3>
                <div className="row">
                  {track_list.map(item => (
                    <Track key={item.track.track_id} track={item.track} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
