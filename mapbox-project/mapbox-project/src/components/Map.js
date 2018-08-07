import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl, Popup, Marker } from "react-mapbox-gl";
import MarkerIcon from './markers/MarkerIcon';

class Map extends Component {

    state = {
        currentPopup: [-70,5],
        i: ''
    }

    _updatePopup(current, index) {
        this.setState({currentPopup : current, i:index})
    }

    _closePopup() {
        this.setState({currentPopup: [-70,5]})
    }


    render() {
      const Map = ReactMapboxGl({
        accessToken: 'pk.eyJ1IjoiZ3Vsc2FoZyIsImEiOiJjams2eGVsNnIxdGQ5M3BuNXhzaXkzeGNjIn0.T_W701upxXuPA5oSsHJypA',
        minZoom: 8,
        doubleClickZoom: true,
        maxZoom: 18
      })

      const { center, zoom, arabica, fabbs,
        anıtkabir, tedu } = this.props
      const { currentPopup, i } = this.state

      const coordinates = {
            Arabica: arabica,
            Fabbs: fabbs,
            Anıtkabir: anıtkabir,
            Tedu: tedu
        } 

      const locations = ['Arabica Coffee', 'Fabbs', 'Anıtkabir', 'TEDU']
    
      return (
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/gulsahg/cjk6xey2zd5h02rnv9kslj2vm"
          containerStyle={{ width: '100vw', height: '85.2vh'}}
          center= {center}
          zoom= {zoom}>
          { Object.keys(coordinates).map((place, index) =>
                <div>
                  <Marker
                    coordinates={coordinates[place]}
                    anchor= "bottom"
                    onClick={() => {this._updatePopup(coordinates[place], index)}}>
                  <MarkerIcon style={{fill: 'orange'}}/>
                  </Marker>
                </div>
             )
          }
            <Popup
            onClick={() => {this._closePopup()}}
            coordinates={currentPopup}
            style={{maxWidth: 200, color: '#4264FB'}}
            offset={{'bottom': [0, -38]}}>
              <h3>{locations[i]}</h3>
            </Popup>
          />
          <ZoomControl/>
        </Map>
      );
    }
}

export default Map;