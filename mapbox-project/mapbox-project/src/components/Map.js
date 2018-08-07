import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl, Popup, Marker } from "react-mapbox-gl";
import MarkerIcon from './markers/MarkerIcon';

class Map extends Component {

    render() {
      const Map = ReactMapboxGl({
        accessToken: 'pk.eyJ1IjoiZ3Vsc2FoZyIsImEiOiJjams2eGVsNnIxdGQ5M3BuNXhzaXkzeGNjIn0.T_W701upxXuPA5oSsHJypA',
        minZoom: 8,
        doubleClickZoom: true,
        maxZoom: 18
      })

      const { center, zoom, arabicaCoordinates, fabbsCoordinates,
        anıtkabirCoordinates, teduCoordinates } = this.props
        
      const coordinates = {
            Arabica: arabicaCoordinates,
            Fabbs: fabbsCoordinates,
            Anıtkabir: anıtkabirCoordinates,
            Tedu: teduCoordinates
        } 
        
      const locations = ['Arabica Coffee', 'Fabbs', 'Anıtkabir', 'Tedu']

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
                    onClick={() => {}}>
                  <MarkerIcon style={{fill: 'orange'}}/>
                  </Marker>
                  <Popup
                    coordinates={coordinates[place]}
                    closeOnClick={true}
                    offset={{
                        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                    }}>
                  <h3>{locations[index]}</h3>
                 </Popup>
                </div>
             )
          }
          />
          <ZoomControl/>
        </Map>
      );
    }
}

export default Map;