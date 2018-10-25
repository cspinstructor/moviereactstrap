import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import SearchForm from './SearchForm';
import Result from './Result';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <SearchForm />
        <Result />
      </div>
    );
  }
}

export default App;
