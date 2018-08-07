import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './components/Map';
import './App.css';

class App extends Component {

  state = {
    center: [ 32.846944, 39.925054 ],
    zoom: [13.5,13.5],
    coordinates: [ [ 32.825604, 39.932066 ],
    [ 32.827547, 39.925583 ],
    [ 32.836944, 39.925054 ],
    [ 32.861673, 39.923257 ]
    ]
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className='container'>
          <Map 
          center={this.state.center}
          zoom={this.state.zoom}
          arabica={this.state.coordinates[0]}
          fabbs={this.state.coordinates[1]}
          anıtkabir={this.state.coordinates[2]}
          tedu={this.state.coordinates[3]}
          />
        </div>
      </div>
      
    );
  }
}

export default App;
