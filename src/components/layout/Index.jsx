import React from "react";
import Tracks from "../tracks/Track.jsx";
import Search from "../tracks/Search.jsx";

const Index = () => {
  return (
    <React.Fragment>
      <Search />
      <Tracks />
    </React.Fragment>
  );
};

export default Index;
