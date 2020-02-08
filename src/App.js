import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRoute } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRoute>
        <div>
          <Main></Main>
        </div>
      </BrowserRoute>
    );
  }
}

export default App;
