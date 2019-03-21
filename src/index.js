import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
const composeEnhancers =
    typeof window ==='object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;
const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
  <BrowserRouter>
      <App/>
  </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
