import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { Provider } from "./context.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Index from "./components/layout/Index.jsx";
import Lyrics from "./components/tracks/Lyrics.jsx";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/lyrics/tracks/:id" component={Lyrics} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
