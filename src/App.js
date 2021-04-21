import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AppInstall from './AppInstall';
import AppMain from './AppMain';

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path={process.env.PUBLIC_URL + "/install"} component={AppInstall} />
          <Route path={process.env.PUBLIC_URL + "/cart"} component={AppMain} />
        </Switch>
      </div>
    </Router>
  );
}


