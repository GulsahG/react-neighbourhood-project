import React, { Component } from 'react';
import logo from './logo.svg';
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl, Popup, Marker } from "react-mapbox-gl";
import './App.css';
import MarkerIcon from './markers/MarkerIcon';

class App extends Component {

  render() {
    const Map = ReactMapboxGl({
      accessToken: 'pk.eyJ1IjoiZ3Vsc2FoZyIsImEiOiJjams2eGVsNnIxdGQ5M3BuNXhzaXkzeGNjIn0.T_W701upxXuPA5oSsHJypA',
      minZoom: 8,
      doubleClickZoom: true,
      maxZoom: 18
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className='container'>
          <Map
          // eslint-disable-next-line
          style="mapbox://styles/gulsahg/cjk6xey2zd5h02rnv9kslj2vm"
          containerStyle={{ width: '100vw', height: '85.2vh'}}
          center= {[ 32.846944, 39.925054 ]}
          zoom= {[13.5,13.5]}>
          <Marker
          coordinates={[ 32.825604, 39.932066 ]}
          anchor="bottom"
          onClick={() => {console.log('clickedArabica')}}
          >
          <MarkerIcon style={{fill: 'lightgray'}}/>
          </Marker>
          <Marker
          coordinates={[ 32.827547, 39.925583 ]}
          anchor="bottom"
          onClick={() => {console.log('clickedFabbs')}}
          >
          <MarkerIcon style={{fill: 'purple'}}/>
          </Marker>
          <Marker
          coordinates={[ 32.836944, 39.925054 ]}
          anchor="bottom"
          onClick={() => {console.log('clickedAnıtkabir')}}
          >
          <MarkerIcon style={{fill: 'orange'}}/>
          </Marker>
          <Marker
          coordinates={[ 32.861673, 39.923257 ]}
          anchor="bottom"
          onClick={() => {console.log('clickedTedu')}}
          >
          <MarkerIcon style={{fill: 'blue'}}/>
          </Marker>
          <Popup
            coordinates={[32.836944, 39.925054]}
            offset={{
              'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}>
            <h3>Anıtkabir</h3>
          </Popup>
          <Popup className="popup"
            coordinates={[32.861673, 39.923257]}
            offset={{
              'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}>
            <h3>TEDU</h3>
          </Popup>
          <Popup
            coordinates={[32.825604, 39.932066]}
            offset={{
              'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}>
            <h3>Arabica Coffee</h3>
          </Popup>
          <Popup
            anchor="bottom"
            coordinates={[32.827547, 39.925583]}
            offset={{
              'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}>
            <h3>FABB'S</h3>
          </Popup>
          <ZoomControl/>
          </Map>
        </div>
      </div>
      
    );
  }
}

export default App;
