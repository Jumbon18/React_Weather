import React, {Component} from 'react';
import Weather from './containers/Weather/Weather';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import Favorites from "./containers/Favorities/Favorites";
import Auth from "./containers/Auth/Auth";
import {autoLogin} from "./store/actions/auth";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/favorites" component={Favorites}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={Weather}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (

                <Switch>
                    <Route path="/favorites" component={Favorites}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={Weather}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return (
            <Layout>
                {routes}
            </Layout>
        );

    }
}

    function

    mapStateToProps(state) {
        return {
            isAuthenticated: !!state.auth.token
        }
    }

    function

    mapDispatchToProps(dispatch) {
        return {
            autoLogin: () => dispatch(autoLogin())
        }
    }


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
