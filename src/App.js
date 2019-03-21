import React, { Component } from 'react';
import Weather from './containers/Weather/Weather';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect, withRouter} from "react-router-dom";

class App extends Component {

  render() {
    let routes =(
        <Switch>
          <Route path="/" exact component={Weather}/>
          <Redirect to="/"/>
        </Switch>
    );
    return (
        <Layout>
          {routes}
        </Layout>
    );
  }
}

export default withRouter(App);
