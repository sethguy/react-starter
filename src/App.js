import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import { store } from './Store';

import Home from './Home'
import {Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>

      <HashRouter history={this.props.history} basename='/'>
        <Route exact path="/" component={Home}/>
      </HashRouter>
      </Provider>

    );
  }
}

export default App;
