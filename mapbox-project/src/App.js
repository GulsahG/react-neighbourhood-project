import React, { Component } from 'react';
import logo from './logo.svg';
import wikiLogo from './wikipedia-logo.svg'
import Map from './components/Map';
import './App.css';

class App extends Component {

  state = {
    hasError: false,
    coordinates: [ [ 32.825604, 39.932066 ],
    [ 32.836944, 39.925054 ], [ 32.861673, 39.923257 ],
    [ 32.734754, 39.867520], [ 32.809319, 39.913345],
    [ 32.857375, 39.920971], [ 32.859034, 39.906063],
    [ 32.830912, 39.952085], [ 32.862982, 39.894835]
    ]
  }

  // checks for errors and updates the state
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="Map-logo" alt="mapbox logo" />
          <img src={wikiLogo} className="Wiki-logo "alt="wikipedia logo" />
          <h3 className="Wiki-title">Wikipedia</h3>
        </header>
        <div className='container'>
        {!this.state.hasError ? 
          <Map 
          center={this.state.center}
          zoom={this.state.zoom}
          arabica={this.state.coordinates[0]}
          anıtkabir={this.state.coordinates[1]}
          tedu={this.state.coordinates[2]}
          hacettepe={this.state.coordinates[3]}
          timboo={this.state.coordinates[4]}
          muddy= {this.state.coordinates[5]}
          club= {this.state.coordinates[6]}
          ankamall= {this.state.coordinates[7]}
          seğmenler= {this.state.coordinates[8]}
          />
          :
          <h1>Page couldn't load properly, something went wrong.</h1>
        }
        </div>
      </div>
    );
  }
}

export default App;
